import { useBuilder } from "@/components/website-manager/BuilderContext";

export default function ContentStudio() {
  const { content, updateContent } = useBuilder();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Content
      </p>

      <h2 className="mt-3 text-3xl font-bold">Edit website text</h2>

      <p className="mt-3 text-sm leading-6 text-[#5f6b70]">
        Update the words on your website. The design is locked so your site
        stays professional.
      </p>

      <div className="mt-8 grid gap-6">
        <Panel title="Business Information">
          <Input
            label="Business Name"
            value={content.business_name ?? ""}
            onChange={(value) => updateContent("business_name", value)}
          />

          <Input
            label="Phone"
            value={content.phone ?? ""}
            onChange={(value) => updateContent("phone", value)}
          />

          <Input
            label="Hours"
            value={content.hours ?? ""}
            onChange={(value) => updateContent("hours", value)}
          />
        </Panel>

        <Panel title="Homepage Hero">
          <Input
            label="Headline"
            value={content.hero_headline ?? ""}
            onChange={(value) => updateContent("hero_headline", value)}
          />

          <Textarea
            label="Subheadline"
            value={content.hero_subheadline ?? ""}
            onChange={(value) => updateContent("hero_subheadline", value)}
          />
        </Panel>

        <Panel title="About Section">
          <Textarea
            label="About Text"
            value={content.about_text ?? ""}
            onChange={(value) => updateContent("about_text", value)}
          />
        </Panel>

        <Panel title="Services">
          <ServiceEditor
            number={1}
            title={content.service_1_title ?? ""}
            text={content.service_1_text ?? ""}
            onTitleChange={(value) => updateContent("service_1_title", value)}
            onTextChange={(value) => updateContent("service_1_text", value)}
          />

          <ServiceEditor
            number={2}
            title={content.service_2_title ?? ""}
            text={content.service_2_text ?? ""}
            onTitleChange={(value) => updateContent("service_2_title", value)}
            onTextChange={(value) => updateContent("service_2_text", value)}
          />

          <ServiceEditor
            number={3}
            title={content.service_3_title ?? ""}
            text={content.service_3_text ?? ""}
            onTitleChange={(value) => updateContent("service_3_title", value)}
            onTextChange={(value) => updateContent("service_3_text", value)}
          />
        </Panel>

        <Panel title="Testimonials">
          <TestimonialEditor
            number={1}
            name={content.testimonial_1_name ?? ""}
            text={content.testimonial_1_text ?? ""}
            onNameChange={(value) => updateContent("testimonial_1_name", value)}
            onTextChange={(value) => updateContent("testimonial_1_text", value)}
          />

          <TestimonialEditor
            number={2}
            name={content.testimonial_2_name ?? ""}
            text={content.testimonial_2_text ?? ""}
            onNameChange={(value) => updateContent("testimonial_2_name", value)}
            onTextChange={(value) => updateContent("testimonial_2_text", value)}
          />

          <TestimonialEditor
            number={3}
            name={content.testimonial_3_name ?? ""}
            text={content.testimonial_3_text ?? ""}
            onNameChange={(value) => updateContent("testimonial_3_name", value)}
            onTextChange={(value) => updateContent("testimonial_3_text", value)}
          />
        </Panel>

        <Panel title="Frequently Asked Questions">
          <FAQEditor
            number={1}
            question={content.faq_1_question ?? ""}
            answer={content.faq_1_answer ?? ""}
            onQuestionChange={(value) => updateContent("faq_1_question", value)}
            onAnswerChange={(value) => updateContent("faq_1_answer", value)}
          />

          <FAQEditor
            number={2}
            question={content.faq_2_question ?? ""}
            answer={content.faq_2_answer ?? ""}
            onQuestionChange={(value) => updateContent("faq_2_question", value)}
            onAnswerChange={(value) => updateContent("faq_2_answer", value)}
          />

          <FAQEditor
            number={3}
            question={content.faq_3_question ?? ""}
            answer={content.faq_3_answer ?? ""}
            onQuestionChange={(value) => updateContent("faq_3_question", value)}
            onAnswerChange={(value) => updateContent("faq_3_answer", value)}
          />
        </Panel>
      </div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#ded4c3] bg-white p-5">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-[#ded4c3] p-3"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 rounded-xl border border-[#ded4c3] p-3"
      />
    </label>
  );
}

function ServiceEditor({
  number,
  title,
  text,
  onTitleChange,
  onTextChange,
}: {
  number: number;
  title: string;
  text: string;
  onTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4">
      <h4 className="font-bold">Service {number}</h4>

      <div className="mt-4 grid gap-3">
        <Input label="Title" value={title} onChange={onTitleChange} />
        <Textarea label="Description" value={text} onChange={onTextChange} />
      </div>
    </div>
  );
}

function TestimonialEditor({
  number,
  name,
  text,
  onNameChange,
  onTextChange,
}: {
  number: number;
  name: string;
  text: string;
  onNameChange: (value: string) => void;
  onTextChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4">
      <h4 className="font-bold">Testimonial {number}</h4>

      <div className="mt-4 grid gap-3">
        <Input label="Customer Name" value={name} onChange={onNameChange} />
        <Textarea label="Review Text" value={text} onChange={onTextChange} />
      </div>
    </div>
  );
}

function FAQEditor({
  number,
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
}: {
  number: number;
  question: string;
  answer: string;
  onQuestionChange: (value: string) => void;
  onAnswerChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[#ded4c3] bg-[#f7f4ef] p-4">
      <h4 className="font-bold">FAQ {number}</h4>

      <div className="mt-4 grid gap-3">
        <Input label="Question" value={question} onChange={onQuestionChange} />
        <Textarea label="Answer" value={answer} onChange={onAnswerChange} />
      </div>
    </div>
  );
}