import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const DataCard = ({ title, description, children, className = "" }) => {
  return (
    <Card className={`shadow-lg border h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DataCard;