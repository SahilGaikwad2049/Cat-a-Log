import { useEffect, useState } from "react";

export function DisplayCourse({ courses = [] }) {
  const [courseData, setCourseData] = useState(courses);

  const fetchData = async () => {
    fetch("http://localhost:3000/attendance").then(async function (res) {
      const json = await res.json();
      setCourseData(json);
    });
  };

  useEffect(()=>{
    setCourseData(courses)
  },[courses])

  const countPresent = async (courseId) => {
    const res = await fetch(
      `http://localhost:3000/attendance/${courseId}/countPresent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // setCourseData((prev) => {
    //   prev.map((course)=>
    //   course._id === courseId ? {...course, present: course.present + 1} : course)
    // })

    // await fetch(`http://localhost:3000/attendance/${courseId}/countPresent`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // const updatedCourse = await res.json()
    fetchData();
  };

  const countAbsent = async (courseId) => {
    const res = await fetch(
      `http://localhost:3000/attendance/${courseId}/countAbsent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const updatedCourse = await res.json()
    fetchData();
  };

  const deleteCourse = async(courseId) => {
    try {
      const resp = await fetch(`http://localhost:3000/courses/${courseId}`, {
        method: "DELETE",
      });
      if(resp.ok) {
        setCourseData((prev) => prev.filter((course) => course._id !== courseId));
      } 
    }
    catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-[86.9vh] flex flex-col items-center">
      <main className="w-full max-w-6xl px-4">
        {/* Heading */}
        <h1 className="text-center font-mono font-semibold text-[30px] m-6">
          Your Logs
        </h1>
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((prop) => (
            <div
              key = {prop.idd || prop._id || Math.random()}
              className="flex flex-col bg-gray-100 rounded-lg shadow-md p-4"
            >
              <h2 className="font-semibold text-[22px]">{prop.course}</h2>
              <div className="flex justify-between m-2">
                <div className="flex gap-3 items-center justify-start">
                <p className="font-medium">{prop.present}P</p>
                <p className="font-medium">{prop.absent}A</p>
                </div>
                <p className="text-[30px] font-medium">{prop.percentage}%</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => countPresent(prop._id)}
                  className="px-3 py-2 text-sm font-medium text-white bg-[#333D79FF] rounded-lg hover:font-extrabold"
                >
                  INC
                </button>
                <button
                  onClick={() => countAbsent(prop._id)}
                  className="px-3 py-2 text-sm font-medium text-white bg-[#333D79FF] rounded-lg hover:font-extrabold"
                >
                  DEC
                </button>
                <button
                  onClick={() => deleteCourse(prop._id)}
                  className="px-3 py-2 text-sm font-medium text-white bg-[#333D79FF] rounded-lg hover:font-extrabold"
                >
                  Delete
                </button>
                <button
                  className="px-3 py-2 text-sm font-medium text-white bg-[#333D79FF] rounded-lg hover:font-extrabold"
                >
                  Undo
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}    

