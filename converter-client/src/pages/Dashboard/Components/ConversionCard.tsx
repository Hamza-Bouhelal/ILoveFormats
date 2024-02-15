import { Card, CardBody } from "@nextui-org/card";
import "./ConversionCard.css";

interface CardProps {
  title: string;
  description: string;
  redirectTo: string;
}

function CardContainer({ children }: { children: React.ReactNode }) {
  return <div className="card-container py-8 mx-12">{children}</div>;
}

function ConversionCard({ title, description, redirectTo }: CardProps) {
  return (
    <div
      className="w-[280px] cursor-pointer "
      onClick={() => (window.location.href = redirectTo)}
    >
      <Card className="p-8 hover:bg-primary/50 h-[180px]">
        <CardBody className="overflow-visible py-2">
          <div className="flex-1">
            <h3 className="text-xm font-bold uppercase">{title}</h3>
            <p className="break-after-all pt-4 text-xs">{description}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default { Card: ConversionCard, Container: CardContainer };
