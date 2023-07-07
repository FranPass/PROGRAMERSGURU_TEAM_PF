import axios from "axios";

//COURSES:
export const getCoursesAllRequest = async () => {
    const { data } = await axios.get("http://localhost:3001/course")
    return data;
}

export const postCourse = async (datos) => {
    const { data } = await axios.post("http://localhost:3001/course",datos)
    return data;
}
export const getCoursesByNameRequest = async (name) => {
    const { data } = await axios.get(/* SERVER ENDPOINT */);
    return data;
}

export const postCourse = async (datos) => {
    const { data } = await axios.post("http://localhost:3001/course", datos)
    return data;
}

export const deleteCourseRequest = async (id) => {
    const { data } = await axios.delete(`http://localhost:3001/course/${id}`);
    return data;
}

//CATEGORIES:
export const getCategoriesAllRequest = async () => {
    const { data } = await axios("http://localhost:3001/technology");
    return data;
}

export const postCategoriesRequest = async (technology) => {
    const { data } = await axios.post("http://localhost:3001/technology", technology);
    return data;
}

export const deleteCategoriesRequest = async (id) => {
    const { data } = await axios.delete(`http://localhost:3001/technology/${id}`);
    return data;

}
export const deleteCourseRequest = async (id) => {
    const { data } = await axios.delete(`http://localhost:3001/course/${id}`);
    return data;
}