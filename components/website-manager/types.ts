export type DemoContent = {
  id: string;
  business_name: string;
  hero_headline: string;
  hero_subheadline: string;
  about_text: string;
  announcement: string | null;
  phone: string | null;
  hours: string | null;

  industry_architecture: string | null;
  color_theme: string | null;
  layout_preset: string | null;
  secondary_color: string | null;
  tertiary_color: string | null;

  service_1_title: string | null;
  service_1_text: string | null;
  service_2_title: string | null;
  service_2_text: string | null;
  service_3_title: string | null;
  service_3_text: string | null;

  selected_theme: string | null;
  hero_layout: string | null;
  primary_color: string | null;
  accent_color: string | null;

  logo_url: string | null;
  logo_width: number | null;
  logo_position_x: number | null;
  logo_position_y: number | null;
  logo_border_radius: number | null;

  hero_image_url: string | null;
  hero_image_height: number | null;
  hero_image_zoom: number | null;
  hero_image_position_x: number | null;
  hero_image_position_y: number | null;
  hero_media_type: string | null;
  hero_video_url: string | null;

  enabled_sections: string[] | null;
  section_order: string[] | null;
  gallery_title: string | null;

  nav_button_text: string | null;
  nav_button_link: string | null;

  gallery_image_1_url: string | null;
gallery_image_2_url: string | null;
gallery_image_3_url: string | null;

testimonial_1_name: string | null;
testimonial_1_text: string | null;

testimonial_2_name: string | null;
testimonial_2_text: string | null;

testimonial_3_name: string | null;
testimonial_3_text: string | null;

faq_1_question: string | null;
faq_1_answer: string | null;

faq_2_question: string | null;
faq_2_answer: string | null;

faq_3_question: string | null;
faq_3_answer: string | null;

cta_headline: string | null;
cta_description: string | null;
cta_button_text: string | null;

footer_tagline: string | null;
footer_show_powered_by: boolean | null;
};