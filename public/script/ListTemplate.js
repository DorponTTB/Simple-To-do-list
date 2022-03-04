export class ListTemplate {
    constructor(tab) {
        this.tab = tab;
    }
    render(taskName) {
        const segment = document.createElement("div");
        segment.classList.add("segment");
        const accordion = document.createElement("div");
        accordion.classList.add("accordion", "shrinked");
        if (this.tab.classList.contains("to-do-tasks")) {
            accordion.innerText = "Task - ";
        }
        else {
            accordion.innerText = "Completed - ";
        }
        segment.append(accordion);
        const span = document.createElement("span");
        span.innerText = taskName;
        accordion.append(span);
        const actions = document.createElement("div");
        actions.classList.add("actions");
        segment.append(actions);
        const button = document.createElement("button");
        const input = document.createElement("input");
        if (this.tab.classList.contains("to-do-tasks")) {
            input.setAttribute("type", "checkbox");
            button.setAttribute("type", "button");
            actions.append(input, button);
        }
        else {
            button.setAttribute("type", "button");
            actions.append(button);
        }
        this.tab.append(segment);
        accordion.addEventListener("click", () => {
            accordion.classList.toggle("shrinked");
        });
        button.addEventListener("click", () => {
            this.tab.removeChild(segment);
        });
    }
}