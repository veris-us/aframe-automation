import type { SectionProps } from "./types";

export default function FAQSection({
  content,
  primary,
  secondary,
  tertiary,
  isDark,
  themeStyle,
}: SectionProps) {
  const faqs = [
    {
      question: content.faq_1_question,
      answer: content.faq_1_answer,
    },
    {
      question: content.faq_2_question,
      answer: content.faq_2_answer,
    },
    {
      question: content.faq_3_question,
      answer: content.faq_3_answer,
    },
  ].filter((faq) => faq.question || faq.answer);

  return (
    <section
      className={themeStyle.sectionPadding}
      style={{
        backgroundColor: isDark ? "#050505" : tertiary,
      }}
    >
      <p
        className="text-sm font-bold uppercase tracking-[0.25em]"
        style={{
          color: secondary,
        }}
      >
        FAQ
      </p>

      <h2
        className="mt-3 text-3xl font-black"
        style={{
          color: isDark ? "#fff" : primary,
        }}
      >
        Frequently Asked Questions
      </h2>

      <div className="mt-8 grid gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`
              ${themeStyle.radius}
              ${themeStyle.borderWidth}
              ${themeStyle.cardPadding}
              ${themeStyle.cardShadow}
            `}
            style={{
              borderColor: secondary,
              backgroundColor: isDark ? "#0b0b0b" : "#ffffff",
            }}
          >
            <h3
              className="font-bold"
              style={{
                color: isDark ? "#fff" : primary,
              }}
            >
              {faq.question}
            </h3>

            <p
              className="mt-3 leading-7"
              style={{
                color: isDark ? "#d4d4d8" : "#5f6b70",
              }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}