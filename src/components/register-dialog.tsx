import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { Course, Student } from "@/lib/types";

type RegisterDialogProps = {
  availableCourses: Course[];
  student: Student;
  onEnroll: (courseId: string, time: string) => void;
};

function currentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // "HH:mm"
}

export function RegisterDialog({ availableCourses, student, onEnroll }: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(currentTime());

  const selectedCourse = availableCourses.find((c) => c.courseId === courseId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!courseId) return;
    onEnroll(courseId, time);
    setCourseId("");
    setTime(currentTime());
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <Select value={courseId} onValueChange={(value) => setCourseId(value ?? "")}>
              <SelectTrigger
                id="courseId"
                className="h-auto min-h-8 w-full items-start py-1.5 text-left [&_svg]:mt-1 [&_svg]:shrink-0"
              >
                <span
                  className={
                    selectedCourse
                      ? "flex-1 whitespace-normal break-words text-left"
                      : "flex-1 whitespace-normal break-words text-left text-muted-foreground"
                  }
                >
                  {selectedCourse
                    ? `${selectedCourse.courseId} – ${selectedCourse.courseTitle}`
                    : "เลือกวิชา"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem
                    key={course.courseId}
                    value={course.courseId}
                    className="whitespace-normal"
                  >
                    {course.courseId} – {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input id="fullName" readOnly value={`${student.firstName} ${student.lastName}`} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" readOnly value={student.program} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}