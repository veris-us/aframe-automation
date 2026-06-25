import { useBuilder } from "@/components/builder/BuilderContext";

export default function ContentStudio() {
  const { content, updateContent } = useBuilder();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6f8b]">
        Content Studio
      </p>

      <h2 className="mt-3 text-3xl font-bold">Website content</h2>

      <div className="mt-8 grid gap-6">
        <Panel title="Business Info">
          <Input
            label="Business Name"
            value={content.business_name}
            onChange={(value) => updateContent("business_name", value)}
          />

          <Input
            label="Announcement"
            value={content.announcement ?? ""}
            onChange={(value) => updateContent("announcement", value)}
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

        <Panel title="Navigation">
  <Input
    label="Nav Button Text"
    value={content.nav_button_text ?? ""}
    onChange={(value) => updateContent("nav_button_text", value)}
  />

  <Input
    label="Nav Button Link"
    value={content.nav_button_link ?? ""}
    onChange={(value) => updateContent("nav_button_link", value)}
  />
</Panel>

        <Panel title="Hero">
          <Input
            label="Hero Headline"
            value={content.hero_headline}
            onChange={(value) => updateContent("hero_headline", value)}
          />

          <Textarea
            label="Hero Subheadline"
            value={content.hero_subheadline}
            onChange={(value) => updateContent("hero_subheadline", value)}
          />
        </Panel>

        <Panel title="About">
          <Textarea
            label="About Text"
            value={content.about_text}
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

        <Panel title="Gallery">
          <Input
            label="Gallery Title"
            value={content.gallery_title ?? ""}
            onChange={(value) => updateContent("gallery_title", value)}
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

        <Panel title="FAQ">
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

        <Panel title="Call To Action">
          <Input
            label="CTA Headline"
            value={content.cta_headline ?? ""}
            onChange={(value) => updateContent("cta_headline", value)}
          />

          <Textarea
            label="CTA Description"
            value={content.cta_description ?? ""}
            onChange={(value) => updateContent("cta_description", value)}
          />

          <Input
            label="CTA Button Text"
            value={content.cta_button_text ?? ""}
            onChange={(value) => updateContent("cta_button_text", value)}
          />
        </Panel>

        <Panel title="Footer">
  <Input
    label="Footer Tagline"
    value={content.footer_tagline ?? ""}
    onChange={(value) => updateContent("footer_tagline", value)}
  />

  <label className="flex items-center gap-3 rounded-xl border border-[#ded4c3] p-3">
    <input
      type="checkbox"
      checked={content.footer_show_powered_by ?? true}
      onChange={(event) =>
        updateContent("footer_show_powered_by", event.target.checked)
      }
    />
    Show “Powered by A Frame Automation”
  </label>
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