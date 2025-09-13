import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateThankYou = async (company: string, position: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly assistant who writes short, natural thank-you messages for job applications. Make them sound human, not like a template.",
        },
        {
          role: "user",
          content: `Create a thank-you message for someone who applied to the position of ${position} at ${company}. Keep it under 250 characters, polite and enthusiastic.`,
        },
      ],
      temperature: 0.9,
      max_completion_tokens: 70,
    });

    return (
      response.choices?.[0]?.message?.content ?? "Could not generate message."
    );
  } catch (err) {
    console.error("GPT generation error:", err);
    return "Could not generate message.";
  }
};
