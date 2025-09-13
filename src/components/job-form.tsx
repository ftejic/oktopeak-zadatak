import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useJobs } from "../context/JobContext";
import { useState } from "react";
import { generateThankYou } from "../service/gptService";

const formSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function JobForm() {
  const { addJob } = useJobs();
  const [tempData, setTempData] = useState<FormValues | null>(null);
  const [thankYouMessage, setThankYouMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Applied",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setTempData(data);
    setLoading(true);
    try {
      const message = await generateThankYou(data.company, data.position);
      setThankYouMessage(message);
    } catch (error) {
      setThankYouMessage("Failed to generate message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!tempData || !thankYouMessage) return;
    addJob({ ...tempData, message: thankYouMessage });
    reset();
    setTempData(null);
    setThankYouMessage(null);
  };

  const handleCancel = () => {
    setTempData(null);
    setThankYouMessage(null);
    reset();
  };

  return (
    <div>
      {!thankYouMessage ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="text-sm font-semibold">Company</label>
            <input
              {...register("company")}
              className="mt-1 block w-full h-9 rounded-md border border-text bg-transparent px-3 py-1 shadow-xs  focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] outline-none transition-all"
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold">Position</label>
            <input
              {...register("position")}
              className="mt-1 block w-full h-9 rounded-md border border-text bg-transparent px-3 py-1 shadow-xs  focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] outline-none transition-all"
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold">Status</label>
            <select
              {...register("status")}
              className="mt-1 w-full h-9 rounded-md border border-text px-3 py-1 shadow-xs outline-none bg-background"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
          <div className="sm:flex sm:justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-background mt-2 px-4 py-2 rounded hover:bg-primary/90 transition-all cursor-pointer w-full sm:w-fit"
            >
              {loading ? "Please wait..." : "Add Application"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <h3 className="font-semibold">Generated Thank-You Message</h3>
          <textarea
            value={thankYouMessage}
            onChange={(e) => setThankYouMessage(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
          <div className="space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-end">
            <button
              onClick={handleCancel}
              className="bg-background text-text px-4 py-2 rounded hover:bg-text/5 border  border-text/50 transition-all cursor-pointer w-full sm:w-fit"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="bg-primary text-background px-4 py-2 rounded hover:bg-primary/90 transition-all cursor-pointer w-full sm:w-fit"
            >
              Save Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
