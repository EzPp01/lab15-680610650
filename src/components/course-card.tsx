import type { Course, Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnenroll?: (courseId: string) => void;
};

// แสดงวันที่แบบ พ.ศ. ตาม Tips ในโจทย์ (Intl.DateTimeFormat + calendar: "buddhist")
function formatThaiDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className={
            isEnrolled
              ? "shrink-0 border-transparent bg-amber-100 text-amber-700 dark:bg-purple-500/20 dark:text-purple-300"
              : "shrink-0 border-transparent bg-purple-100 text-purple-700 dark:bg-amber-500/20 dark:text-amber-300"
          }
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </Badge>
      </CardHeader>

      {isEnrolled && (
        <>
          <CardContent className="flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => onUnenroll?.(course.courseId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            ลงทะเบียนเมื่อ: {formatThaiDate(enrolledAt)}
          </CardFooter>
        </>
      )}
    </Card>
  );
}