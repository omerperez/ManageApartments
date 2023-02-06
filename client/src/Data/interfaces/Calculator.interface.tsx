interface StaticCalculatorCard {
  type: "water" | "electric";
  title: string;
  backgroundColor: string;
  icon: JSX.Element;
}

interface CalculatorCard extends StaticCalculatorCard {
  price: string;
}

export type { CalculatorCard, StaticCalculatorCard };
