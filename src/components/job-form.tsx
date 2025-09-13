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
      const message = await generateThankYou(data.company, data.position, data.status);
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
          <div className="space-y-1">
            <label className="text-sm font-semibold">Company</label>
            <input {...register("company")} />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold">Position</label>
            <input {...register("position")} />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold">Status</label>
            <select
              {...register("status")}
              className="w-full h-9 rounded-md border px-3 py-1 shadow-xs outline-none bg-background"
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
              className="button-primary w-full sm:w-fit mt-2"
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
            rows={4}
          />
          <div className="space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-end">
            <button
              onClick={handleCancel}
              className="button-outline w-full sm:w-fit"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="button-primary w-full sm:w-fit"
            >
              Save Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
