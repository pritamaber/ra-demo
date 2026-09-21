export const site = {
  name: "New R. A. Jewellery House",
  shortName: "RA Jewellers",
  url: "https://ra-jewellery-demo.vercel.app", // TODO(client): confirm final domain
  address: {
    line: "Bus Stand, Rajarhat Chowmatha, L-91B",
    city: "Kolkata",
    state: "West Bengal",
    pin: "700135",
  },
  phone: "+91 90385 13522",
  phoneHref: "tel:+919038513522",
  whatsappNumber: "919038513522",
  rating: { value: 4.2, count: 53 },
  serviceAreas: ["Rajarhat", "New Town", "Chinar Park", "Baguiati", "Salt Lake", "Kestopur"],
  // TODO(client): confirm full weekly schedule; only the 5 pm evening opening is confirmed
  hours: "Evening opening at 5 pm · full schedule to be confirmed",
  // TODO(client): confirm exact coordinates and Google Maps URL
  geo: { lat: 22.6, lng: 88.4 },
  mapsUrl: "",
  tagline: "Right at the Rajarhat Chowmatha bus stand",
  agency: { name: "Reba Digital Solutions", url: "https://rebadigitalsolutions.com" },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
