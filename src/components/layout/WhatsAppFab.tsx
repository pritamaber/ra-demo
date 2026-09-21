import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi, I'd like to know about your jewellery collection.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a7f4b] text-white shadow-lg hover:bg-[#146338]"
    >
      <WhatsAppIcon />
    </a>
  );
}
