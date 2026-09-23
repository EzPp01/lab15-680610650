import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>ระบบลงทะเบียนเรียน CPE & ISNE</CardTitle>
      </CardHeader>
      <CardContent>
        <Button render={<Link to="/enrollment" />}>ไปหน้าลงทะเบียนเรียน</Button>
      </CardContent>
    </Card>
  );
}