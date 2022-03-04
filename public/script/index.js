import { ListTemplate } from "../../public/script/ListTemplate.js";
const tabSwitcher = document.querySelectorAll("nav a.item"), tabs = document.querySelectorAll('section[aria-label^="organize"] > div');
tabSwitcher.forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("nav .active").classList.remove("active");
        document.querySelector('section[aria-label^="organize"] > .active').classList.remove("active");
        ele.classList.add("active");
        tabs[index].classList.add("active");
    });
});
const newTaskForm = document.querySelector(".add-new-task form"), newTask = document.querySelector(".add-new-task textarea"), todoTasksTab = document.querySelector(".to-do-tasks"), completedTasksTab = document.querySelector(".completed-tasks");
function throwError(message) {
    const errorElement = document.querySelector(".error-message");
    errorElement.innerText = message;
    errorElement.classList.add("visible");
    setTimeout(() => {
        errorElement.classList.remove("visible");
    }, 1600);
}
const listTemplate = new ListTemplate(todoTasksTab);
newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newTask.value === "")
        return throwError("Task cannot be empty!");
    if (newTask.value.replace(/\n| /g, "").length > 1200)
        return throwError("Your task is too long!");
    listTemplate.render(newTask.value.replace(/\n/g, " "));
    newTask.value = "";
});
const listTemplate2 = new ListTemplate(completedTasksTab);
todoTasksTab.addEventListener("click", (e) => {
    const checkbox = e.target;
    if (checkbox.type !== "checkbox")
        return;
    checkbox.closest(".actions").style.backgroundPositionY = "-2.574rem, -0.03rem";
    const segment = checkbox.closest(".segment");
    setTimeout(() => {
        listTemplate2.render(segment.querySelector(".accordion span").innerText.replace(/\n/g, " "));
        todoTasksTab.removeChild(segment);
    }, 990);
});