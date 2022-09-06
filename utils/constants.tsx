import VisaCard from "../assets/img/cards/visa.svg";
import DiscoverCard from "../assets/img/cards/discover.svg";
import AmexCard from "../assets/img/cards/amex.svg";
import Mastercard from "../assets/img/cards/mastercard.svg";

import { Course } from "../types";

export const testCourses: Course[] = [
  {
    id: "1",
    title: "The REAL Cost of Bad Credit",
    status: "completed",
  },
  {
    id: "2",
    title: `How Does Your "Credit" Actually Work?`,
    status: "in_progress",
  },
  {
    id: "3",
    title: `The REAL Cost of Bad Credit`,
    status: "not_started",
  },
];

export const CARD_MAP = {
  Visa: <VisaCard />,
  AmEx: <AmexCard />,
  Discover: <DiscoverCard />,
  MasterCard: <Mastercard />,
};
