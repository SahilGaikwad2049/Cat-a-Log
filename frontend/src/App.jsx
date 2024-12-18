import { useEffect, useState } from "react"
import { AddCourse } from "./components/AddCourse"
import { Nav } from "./components/Nav"
import { DisplayCourse } from "./components/DisplayCourse"

function App() {

  const [courses, setcourses] = useState([])

  const fetchData = async () => {
    fetch("http://localhost:3000/attendance")
    .then(async function(res) {
      const json = await res.json()
      console.log(json)
      setcourses(json)
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="bg-[#FAEBEFFF]">
      {/* <Nav/> */}
      <AddCourse setcourses = {setcourses} courses = {courses}/>
      <DisplayCourse courses = {courses} />
    </div>
  )
}

export default App
