import { useState } from "react";

export function AddCourse({ setcourses, courses }) {
  const [course, setCourse] = useState("");

  async function buttonChange() {
    if (course.trim() === "") {
      return;
    }
  
    const newCourse = {
      course: course,
      present: 0,
      absent: 0,
      percentage: 0,
    };
  
    try {
      const response = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      const data = await response.json();
  
      const savedCourse = data.course;
      setcourses([...courses, savedCourse]);
      setCourse("");
    } 
    catch (error) {
      console.error("Error:", error.message);
    }
  }
  

  return (
    <div>
      <main className="bg-[#333D79FF] w-full p-6 flex justify-between items-center">
        <div className="text-[43px] font-mono font-extrabold text-white ">
          Cat-a-Log
        </div>
        <div>
          <label
            htmlFor="coursename"
            className="block mb-1 text-sm font-mono font-bold text-white px-1"
          >
            Class
          </label>
          <input
            className="outline-none focus:ring-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-50 p-2"
            type="text"
            placeholder="CSO-101"
            id="coursename"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <button
            className="text-white mx-3 bg-[#202024] rounded-lg text-sm px-4 py-2 font-medium"
            onClick={buttonChange}
          >
            ADD
          </button>
        </div>
      </main>
    </div>
  );
}
