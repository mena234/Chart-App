let widget = document.getElementById("widget");
let dashboardSlot = document.getElementById("dashboard-slot");
let chartDiv = document.getElementById("countries-chart");
let blusIcon = document.getElementById("blus-icon");
let saveButton = document.getElementById("save-button");


saveButton.addEventListener('click', () => {
    sessionStorage.setItem('width', dashboardSlot.clientWidth);
    sessionStorage.setItem('height', dashboardSlot.clientHeight);
})

window.addEventListener('load', () => {
    setWidthAndHeight();
    setThePlaceOfChart();

})

const setWidthAndHeight = () => {
    if (Boolean(sessionStorage.getItem('width')) && Boolean(sessionStorage.getItem('height'))) {
        dashboardSlot.style.width = sessionStorage.getItem('width') + 'px';
        dashboardSlot.style.height = sessionStorage.getItem('height') + 'px';
    }
};

const setThePlaceOfChart = () => {
    if (Boolean(sessionStorage.getItem('targetId')) && Boolean(sessionStorage.getItem('dropableId'))) {
        let targetElement = document.getElementById(sessionStorage.getItem('targetId'));
        let dropableElement = document.getElementById(sessionStorage.getItem('dropableId'));
        resetParentStyleOfDropableElement(dropableElement);
        targetElement.appendChild(dropableElement);
        resetTargetStyleOnLoad(targetElement);
    }
};

const resetParentStyleOfDropableElement = dropableElement => {
    dropableElement.parentElement.classList.add('dashed-border');
};

const resetTargetStyleOnLoad = targetElement => {
    targetElement.classList.remove('blue-icon-container');
    targetElement.classList.remove('dashed-border');
};


// drag and drop functionality

const allowDrop = ev => {
    ev.preventDefault();
};

const dragStart = ev => {
    ev.dataTransfer.setData("chart", ev.target.id);
    widget.classList.add("dashed-border");
};

const drop = ev => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("chart");
    ev.target.appendChild(document.getElementById(data));
    sessionStorageData(ev, data);
    widget.classList.remove("dashed-border");
};

const sessionStorageData = (ev, data) => {
    sessionStorage.setItem('targetId', ev.target.id);
    sessionStorage.setItem('dropableId', data);
};

// effect on the dashboard slot

const dragEnterDashboard = () => {
    enterActionOnDashboardSlot();
};

const dragEndDashboard = () => {
    leaveActionOnDashboardSlot();
};

const dragLeaveDashboard = () => {
    leaveActionOnDashboardSlot();
};


const leaveActionOnDashboardSlot = () => {
    dashboardSlot.classList.remove("shadow-box");
    widget.classList.add("dashed-border")
};

const enterActionOnDashboardSlot = () => {
    dashboardSlot.classList.add("shadow-box");
    dashboardSlot.classList.remove("dashed-border");
    dashboardSlot.classList.remove("blue-icon-container");
};


// effect on the Widget
const dragLeaveWidget = () => {
    leaveActionOnWidgetSlot();
};

const dragEnterWidget = () => {
    enterActionOnWidgetSlot();
};

const dragEndWidget = () => {
    leaveActionOnWidgetSlot();
};


const leaveActionOnWidgetSlot = () => {
    widget.classList.remove("shadow-box");
    dashboardSlot.classList.add("dashed-border")
    dashboardSlot.classList.add("blue-icon-container")
};

const enterActionOnWidgetSlot = () => {
    widget.classList.add("shadow-box");
    widget.classList.remove("dashed-border");
};
