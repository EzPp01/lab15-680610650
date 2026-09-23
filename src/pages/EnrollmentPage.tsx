import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments as initialEnrollments } from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(
    initialEnrollments.filter((e) => e.studentId === currentStudent.studentId),
  );

  function handleEnroll(courseId: string, time: string) {
    const now = new Date();
    const [hours, minutes] = time.split(":");
    now.setHours(Number(hours), Number(minutes), 0, 0);

    setEnrollments((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: now.toISOString(),
      },
    ]);
  }

  function handleUnenroll(courseId: string) {
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  }

  const availableCourses = courses.filter(
    (c) => !enrollments.some((e) => e.courseId === c.courseId),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
        <RegisterDialog
          availableCourses={availableCourses}
          student={currentStudent}
          onEnroll={handleEnroll}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find((e) => e.courseId === course.courseId);
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={!!enrollment}
              enrolledAt={enrollment?.enrolledAt}
              onUnenroll={handleUnenroll}
            />
          );
        })}
      </div>
    </div>
  );
}