import type { Course, Student } from "@/lib/types";
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

function formatThaiDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
        <span
          className={
            isEnrolled
              ? "shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700"
              : "shrink-0 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700"
          }
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </span>
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