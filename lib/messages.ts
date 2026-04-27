export type Message = {
  id: string;
  from: "me" | "vendor";
  text?: string;
  voice?: { durationSec: number };
  at: string;
};

export type Thread = {
  vendorSlug: string;
  unread: number;
  lastAt: string;
  messages: Message[];
};

export const threads: Thread[] = [
  {
    vendorSlug: "wzyotb",
    unread: 1,
    lastAt: "just now",
    messages: [
      { id: "1", from: "me", text: "Yo, saw the strategy call. Open Friday?", at: "Tue 2:14p" },
      { id: "2", from: "vendor", text: "Friday's good. 11am or 2pm?", at: "Tue 2:18p" },
      { id: "3", from: "me", text: "2pm works", at: "Tue 2:21p" },
      { id: "4", from: "vendor", text: "Locked. Drop me what you wanna cover beforehand.", at: "Tue 2:22p" },
      { id: "5", from: "vendor", voice: { durationSec: 38 }, at: "just now" },
    ],
  },
  {
    vendorSlug: "cuts-by-quan",
    unread: 0,
    lastAt: "1h",
    messages: [
      { id: "1", from: "me", text: "Need a cut Sat for a wedding. Available?", at: "Mon 9:02a" },
      { id: "2", from: "vendor", text: "Got you. Where you at?", at: "Mon 9:11a" },
      { id: "3", from: "me", text: "Wynwood", at: "Mon 9:13a" },
      { id: "4", from: "vendor", text: "Pull up at 11. $80 for the full reset.", at: "Mon 9:15a" },
      { id: "5", from: "me", text: "Bet. Booking now.", at: "1h" },
    ],
  },
  {
    vendorSlug: "side-b-music",
    unread: 2,
    lastAt: "3h",
    messages: [
      { id: "1", from: "me", text: "Need a beat for a single. Trap, melodic, 140ish.", at: "Sun 7:20p" },
      { id: "2", from: "vendor", text: "I got you. 10 days, exclusive, $450.", at: "Sun 7:33p" },
      { id: "3", from: "vendor", text: "Want a reference track? Send what you been on.", at: "3h" },
      { id: "4", from: "vendor", voice: { durationSec: 22 }, at: "3h" },
    ],
  },
  {
    vendorSlug: "rico-rentals",
    unread: 0,
    lastAt: "yesterday",
    messages: [
      { id: "1", from: "me", text: "Charger this weekend?", at: "Wed 4:01p" },
      { id: "2", from: "vendor", text: "Friday to Sunday clean. $480 for the SUV if you want bigger.", at: "Wed 4:14p" },
      { id: "3", from: "me", text: "Charger's good", at: "yesterday" },
    ],
  },
  {
    vendorSlug: "studio-24",
    unread: 0,
    lastAt: "2 days",
    messages: [
      { id: "1", from: "me", text: "Music video for one song. Memphis or LA?", at: "Sat 1:10p" },
      { id: "2", from: "vendor", text: "Memphis is home. LA we travel — quote diff. Standard 1-song shoot is $400 in town.", at: "Sat 1:34p" },
      { id: "3", from: "me", text: "Memphis works. Send dates.", at: "2 days" },
    ],
  },
];

export function getThread(vendorSlug: string): Thread | undefined {
  return threads.find((t) => t.vendorSlug === vendorSlug);
}

export function totalUnread(): number {
  return threads.reduce((s, t) => s + t.unread, 0);
}
