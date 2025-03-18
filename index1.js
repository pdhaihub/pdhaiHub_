/*----------------------common--------------------*/

let currentSection = 'home';
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let touchStartX = 0;
let touchEndX = 0;
let slideInterval;

const slider = document.querySelector('.slider');
slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    pauseSlideShow(); // Pause the auto-slide when user interacts
});

slider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

// function toggleDropdown(dropdownId) {
//     const dropdown = document.getElementById(`${dropdownId}Dropdown`);
//     if (dropdown.style.display === "block") {
//         dropdown.style.display = "none";
//     } else {
//         dropdown.style.display = "block";
//     }
// }

document.addEventListener("DOMContentLoaded", function () {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const dropdownContent = document.querySelector(".dropdown-content");

    sidebarToggle.addEventListener("click", function () {


        if (dropdownContent.style.display === "flex") {
            dropdownContent.style.display = "none";
            if(window.innerWidth < 768){
                document.querySelector(".header").classList.toggle("unset");
             }
        } else {
            dropdownContent.style.display = "flex";
            dropdownContent.style.flexDirection = "column";
            dropdownContent.style.rowGap = "0.5rem";
            if(window.innerWidth < 768){
                document.querySelector(".header").classList.toggle("unset");
             }
        }
    });
});

slider.addEventListener('touchend', () => {
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50; // Minimum swipe distance to trigger slide change

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // Swipe left to go to the next slide
        } else {
            prevSlide(); // Swipe right to go to the previous slide
        }
    }

    touchStartX = 0;
    touchEndX = 0;
    startSlideShow(); // Resume auto-slide after user interaction
});

document.addEventListener("DOMContentLoaded", function () {
    initializeLectures();
    initializeTutorials();
});

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    pauseSlideShow();
}

function handleTouchMove(e) {
    if (!touchStartX) return;
    touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
    }
    touchStartX = touchEndX = 0;
    startSlideShow();
}


function initializeSlider() {
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.innerHTML = ''; // Clear any existing dots

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active'); // Set the first dot as active
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    startSlideShow();
}

function startSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function pauseSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    startSlideShow();
}

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100 / totalSlides}%)`;

    // Update the active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function showSection(section) {
    console.log('Switching to section:', section);
    currentSection = section;
    
    const dock = document.getElementById('dockc');
    if (dock) {
        dock.classList.remove('class1');
    }
    
    const mainContent = document.getElementById('mainContent');
    mainContent.style.opacity = '0';
    setTimeout(() => {
        mainContent.innerHTML = '';
        switch (section) {
            case 'home': showHome(); break;
            case 'pyq': showPYQ(); break;
            case 'lectures': showLectures(); break;
            case 'tutorials': showTutorials(); break;
            case 'professors': showProfessors(); break;
            case 'cgpa': showCGPACalculator(); break;
        }
        mainContent.style.opacity = '1';
    }, 300);
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    pauseSlideShow();
}

function handleTouchMove(e) {
    if (!touchStartX) return;
    touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
    }
    touchStartX = touchEndX = 0;
    startSlideShow();
}


/*---------------------------home section------------------------------------------------*/

function showHome() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="card">
            <h3>Welcome to PDHAI HUB</h3>
            <p>Your one-stop solution for all academic resources</p>
        </div>`;
}

/*---------------------------PYQ section------------------------------------------------*/

function showPYQ() {
    const Images = document.querySelector('.banner-wrapper');
    Images.style.display = 'none';
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="pyq-section">
            <h2 class="section-title">Previous Year Questions</h2>
            <div class="form-container">
                <select id="streamSelect" class="custom-select">
                    <option value="">Select Stream</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="BIOTECH">BIOTECH</option>
                </select>

                <select id="semesterSelect" class="custom-select" disabled>
                    <option value="">Select Semester</option>
                </select>

                <select id="testSelect" class="custom-select" disabled>
                    <option value="">Select Test</option>
                </select>

                <button id="downloadBtn" class="dock-style-btn" disabled>
                    <i class="fas fa-download"></i>
                   Show PYQ
                </button>
            </div>
        </div>
    `;
    initializePYQ();
}

// index1.js

function initializePYQ() {
    const streamSelect = document.getElementById("streamSelect");
    const semesterSelect = document.getElementById("semesterSelect");
    const testSelect = document.getElementById("testSelect");
    const downloadBtn = document.getElementById("downloadBtn");

    streamSelect.addEventListener("change", () => {
        if (streamSelect.value) {
            semesterSelect.disabled = false;
            populateSemesters(semesterSelect);
        } else {
            semesterSelect.disabled = true;
            testSelect.disabled = true;
            downloadBtn.disabled = true;
        }
    });

    semesterSelect.addEventListener("change", () => {
        if (semesterSelect.value) {
            testSelect.disabled = false;
            populateTests(testSelect); // Populate test options (T1, T2, T3)
        } else {
            testSelect.disabled = true;
            downloadBtn.disabled = true;
        }
    });

    testSelect.addEventListener("change", () => {
        downloadBtn.disabled = !testSelect.value;
    });

    // Update the event listener to call handleDownloadPYQ
    downloadBtn.addEventListener("click", handleDownloadPYQ);
}

// Function to populate test options (T1, T2, T3)
function populateTests(testSelect) {
    testSelect.innerHTML = '<option value="">Select Test</option>';
    const tests = ["T1", "T2", "T3"]; // Test options

    tests.forEach(test => {
        const option = document.createElement('option');
        option.value = test;
        option.textContent = test;
        testSelect.appendChild(option);
    });
}


function populateSubjects(testSelect, semester, type) {
    testSelect.innerHTML = '<option value="">Select Subject</option>';

    const streamSelect = document.getElementById(type === 'lectures' ? 'lectureStreamSelect' : 'tutorialStreamSelect');
    const selectedStream = streamSelect.value;
    
    const subjects = getSubjectsBySemesterAndStream(selectedStream, semester, type);

    if (subjects.length === 0) {
        console.warn("No subjects found for:", selectedStream, semester, type);
    }

    subjects.forEach(subject => {
        const option = document.createElement('option');
        const formattedSubject = subject.toLowerCase().replace(/\s+/g, '-');
        option.value = formattedSubject;
        option.textContent = subject;
        testSelect.appendChild(option);
    });
}

function populateSemesters(select) {

  
    if (!select) {
        console.error("Semester select dropdown not found!");
        return;
    }

    select.innerHTML = '<option value="">Select Semester</option>';
    for (let i = 1; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Semester ${i}`;
        select.appendChild(option);
    }
}

function getSubjectsBySemesterAndStream(stream, semester, type) {
    if (type === 'lectures') {
        return lectureSubjectsBySemester[stream]?.[semester] || [];
    } else if (type === 'tutorials') {
        return tutorialSubjectsBySemester[stream]?.[semester] || [];
    }
    return [];
}

// Function to handle PYQ download with T1, T2, T3 selection
function handleDownloadPYQ() {
    const stream = document.getElementById('streamSelect').value;
    const semester = document.getElementById('semesterSelect').value;
    const test = document.getElementById('testSelect').value;
    
    if (!stream || !semester || !test) {
        alert("Please select Stream, Semester, and Test");
        return;
    }
    
    const driveLink = pyqDriveLinks[stream]?.[semester]?.[test];
    if (driveLink) {
        window.open(driveLink, '_blank');
    } else {
        alert("No drive link found for the selected options.");
    }
}



function handleDownload() {
    const streamSelect = document.getElementById('streamSelect');
    const semesterSelect = document.getElementById('semesterSelect');
    const testSelect = document.getElementById('testSelect');
    
    const downloadInfo = {
        stream: streamSelect.value,
        semester: semesterSelect.value,
        subject: testSelect.options[testSelect.selectedIndex].text
    };

    console.log(`Downloading PYQ for ${downloadInfo.stream} - Semester ${downloadInfo.semester} - ${downloadInfo.subject}`);
    alert(`Download started for:\n${downloadInfo.stream} - Semester ${downloadInfo.semester} - ${downloadInfo.subject}`);
}

/*---------------------------lectures section------------------------------------------------*/

function showLectures() {
    const Images = document.querySelector('.banner-wrapper');
    Images.style.display = 'none';
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="pyq-section">
            <h2 class="section-title">Lectures</h2>
            <div class="form-container">
                <select id="lectureStreamSelect" class="custom-select">
                    <option value="">Select Stream</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="BIOTECH">BIOTECH</option>
                </select>

                <select id="lectureSemesterSelect" class="custom-select" disabled>
                    <option value="">Select Semester</option>
                </select>

                <select id="lecturetestSelect" class="custom-select" disabled>
                    <option value="">Select Subject</option>
                </select>

                <button id="lectureDownloadBtn" class="dock-style-btn" disabled>
                    <i class="fas fa-download"></i>
                    Show Lectures
                </button>
            </div>
        </div>
    `;
    initializeLectures();
}


function initializeLectures() {
    const streamSelect = document.getElementById("lectureStreamSelect");
    const semesterSelect = document.getElementById("lectureSemesterSelect");
    const testSelect = document.getElementById("lecturetestSelect");
    const downloadBtn = document.getElementById("lectureDownloadBtn");

    streamSelect.addEventListener("change", () => {
        semesterSelect.disabled = !streamSelect.value;
        testSelect.disabled = true;
        downloadBtn.disabled = true;
        populateLectureSemesters();
    });

    semesterSelect.addEventListener("change", () => {
        testSelect.disabled = !semesterSelect.value;
        downloadBtn.disabled = true;
        populateSubjects1(testSelect, semesterSelect.value, 'lectures');
    });

    testSelect.addEventListener("change", () => {
        downloadBtn.disabled = !testSelect.value;
    });
    
    document.getElementById("lectureDownloadBtn").addEventListener("click", handleLectureDownload);

}

function populateSubjects1(testSelect, semester, type) {
    testSelect.innerHTML = '<option value="">Select Subject</option>';

    const streamSelect = document.getElementById(type === 'lectures' ? 'lectureStreamSelect' : 'tutorialStreamSelect');
    const selectedStream = streamSelect.value;
    
    const subjects = getSubjectsBySemesterAndStream(selectedStream, semester, type);

    if (subjects.length === 0) {
        console.warn("No subjects found for:", selectedStream, semester, type);
    }

    subjects.forEach(subject => {
        const option = document.createElement('option');
        const formattedSubject = subject.toLowerCase().replace(/\s+/g, '-');
        option.value = formattedSubject;
        option.textContent = subject;
        testSelect.appendChild(option);
    });
}

function populateLectureSemesters() {
    const semesterSelect = document.getElementById('lectureSemesterSelect');
    semesterSelect.innerHTML = '<option value="">Select Semester</option>';
    for (let i = 1; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Semester ${i}`;
        semesterSelect.appendChild(option);
    }
}

function populateLectureSubjects(subjectList) {
    const testSelect = document.getElementById('lecturetestSelect');
    testSelect.innerHTML = '<option value="">Select Subject</option>';
    subjectList.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.toLowerCase().replace(/\s+/g, '-');
        option.textContent = subject;
        testSelect.appendChild(option);
    });
}

// Updated function to get subjects based on both stream and semester
const lectureSubjectsBySemester ={
   
        "CSE": {
            1: ["Workshop", "SDF-1", "Physics-1", "Mathematics-1", "English", "Basic Electronics"],
            2: ["Software Development Fundamentals – II", "Electrical Science -1", "Mathematics 2", "Physics-2", "EDD", "Life Skills And Effective Communication"],
            3: ["Theoretical Foundations of Computer Science", "Data Structures", "Database Systems & Web", "Electrical Science-2", "Economics"],
            4: ["HSS Elective – 1", "Probability and Random Processes ", "DIGITAL SYSTEMS", "Algorithms and Problem Solving"],
            5: ["Computer Organization and Architecture", "Operating Systems and Systems Programming", "Discipline Elective -1", "Science Elective ", "HSS Elective-2"],
            6: ["Computer Networks and Internet of Things", "Discipline Elective – 2(##)", "Discipline Elective – 3(##)", "Open Elective – 1", "Selected Value Added Course (*)", "Software Engineering OR Artificial Intelligence","HSS Elective – 3"],
            7: ["Discipline Elective – 4", "Discipline Elective – 5", "Discipline Elective – 6", "Open Elective – 2"],
            8: ["Discipline Elective – 7", "Discipline Elective – 8", "NOpen Elective -3"]
        },
        "ECE": {
            1: ["Workshop", "SDF-1", "Physics-1", "Mathematics-1", "English", "Basic Electronics"],
            2: ["Mathematics II", "SDF-2", "Electrical Science-1", "Physics-2", "EDD", "Life Skills And Effective Communication"],
            3: ["Electrical Science-2", "Economics", "PRP", "SNS", "DCD", "Environmental Studies", "PCP"],
            4: ["AE", "DSP", "FA", "ADC"],
            5: ["DSA", "Sociology of Media", "Nuclear Science & Engineering", "EMFT", "DIP", "Indian Constitution & Traditional Knowledge"],
            6: ["Medical And Industrial Applications of Nuclear Radiations", "VLSI", "Front-End Programming", "Development Issues & Rural Engineering", "Semiconductor", "Fundamentals of EV"],
            7: ["Distributed Systems", "Blockchain Technology", "Cybersecurity", "IoT"],
            8: ["Big Data", "Quantum Computing", "Natural Language Processing", "Advanced Algorithms"]
        },
        "BIOTECH": {
            1: ["Basic Mathematics-1", "Physics for Biotechnology", "Fundamentals of Computers & Programming - I", "English", "Workshop"],
            2: ["Basic Mathematics-2", "Electrical Science -1", "Biophysical Techniques", "Fundamentals of Computers & Programming - II", "Engineering Drawing and Design", "Life skills and effective communication"],
            3: ["Probability and Statistics", "Biochemistry", "Thermodynamics and Chemical Processes", "Electrical Science-2", "Economics"],
            4: ["HSS Elective -- 1", "Microbiology", "Genetics and Developmental Biology", "Introduction to Bioinformatics"],
            5: ["Molecular biology and Genetic Engineering", "Cell Culture Technology", "Discipline Elective -1", "Science Elective", "HSS Elective-2"],
            6: ["Immunology", "Discipline Elective -- 2", "Discipline Elective -- 3", "Open Elective -- 1", "Selected Value Added Course", "Comparative and Functional Genomics", "HSS Elective -- 3"],
            7: ["Discipline Elective -- 4", "Discipline Elective -- 5", "Discipline Elective -- 6", "Open Elective -- 2"],
            8: ["Discipline Elective -- 7", "Discipline Elective -- 8", "Open Elective -3"]
        }
   

  
}


function handleLectureDownload() {
    const streamSelect = document.getElementById('lectureStreamSelect').value;
    const semesterSelect = parseInt(document.getElementById('lectureSemesterSelect').value);
    const testSelect = document.getElementById('lecturetestSelect').value;

    if (!streamSelect || !semesterSelect || !testSelect) {
        alert("Please select stream, semester, and subject first!");
        return;
    }

    console.log(`Fetching link for Stream: ${streamSelect}, Semester: ${semesterSelect}, Subject: ${testSelect}`);

    const driveLink = subjectDriveLinks[streamSelect]?.[semesterSelect]?.[testSelect];

    if (driveLink) {
        console.log("Opening link:", driveLink);
        window.open(driveLink, '_blank');
    } else {
        alert("No link found for the selected subject. Check the subject name in subjectDriveLinks.js.");
    }
}

/*----------------------------tutorial------------------------------------------------*/
const tutorialSubjectsBySemester = {
    "CSE": {
        1: ["economics", "es-1", "english", "Mathematics-1", "physics-1"],
        2: ["Mathematics II", "SDF-2", "Electrical Science-2", "Physics-2"],
        // Add more semesters and subjects as needed
    },
    "ECE": {
        1: ["economics", "es-1", "english", "Mathematics-1", "physics-1"],
        2: ["Mathematics II", "Electrical Science-2", "Physics-2"],
        3: ["digital communication", "digital-electronics", "microprocessor", "Prp","SNS"],
        4: ["Analog_Communication", "Analog Electronics", "Digital Signal Processing", "VLSI"],
        5: ["EMFT"],
        // Add more semesters and subjects as needed
    },
    "BIOTECH": {
        1: ["economics", "es-1", "english", "Mathematics-1", "physics-1"],
        2: ["Mathematics II", "SDF-2", "Electrical Science-2", "Physics-2"],
        // Add more semesters and subjects as needed
    }
};


function showTutorials() {
    const Images = document.querySelector('.banner-wrapper');
    Images.style.display = 'none';
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="pyq-section">
           
            <div class="tutorial-cards-container">
                <div class="tutorial-card" onclick="showTutorialDownloads()">
                    <i class="fas fa-book fa-3x"></i>
                    <h3>Tutorials</h3>
                    <p>Download Tutorial Questions</p>
                </div>
               
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .tutorial-cards-container {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 2rem;
        }

        .tutorial-card {
            background-color: #333;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--text-light);
            width: 250px;
        }

        .tutorial-card:hover {
            transform: scale(1.05);
            background-color: var(--primary-color);
            color: var(--secondary-color);
            box-shadow: 0 5px 15px rgba(255, 165, 0, 0.4);
        }

        .tutorial-card i {
            margin-bottom: 1rem;
        }

        .tutorial-card h3 {
            margin-bottom: 0.5rem;
        }

        @media (max-width: 600px) {
            .tutorial-cards-container {
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);
}

function showTutorialDownloads() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="pyq-section">
            <h2 class="section-title">Download Tutorials</h2>
            <div class="form-container">
                <select id="tutorialStreamSelect" class="custom-select">
                    <option value="">Select Stream</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="BIOTECH">BIOTECH</option>
                </select>

                <select id="tutorialSemesterSelect" class="custom-select" disabled>
                    <option value="">Select Semester</option>
                </select>

                <select id="tutorialSubjectSelect" class="custom-select" disabled>
                    <option value="">Select Subject</option>
                </select>

                <button id="tutorialDownloadBtn" class="dock-style-btn" disabled>
                    <i class="fas fa-external-link-alt"></i>
                    Show Tutorials
                </button>
            </div>
            <div id="tutorialLinkStatus" class="status-message"></div>
        </div>
    `;
    initializeTutorialDownloads();
}

function showTutorialSolutions() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="pyq-section">
            <h2 class="section-title">Download Tutorial Solutions</h2>
            <div class="form-container">
                <select id="solutionStreamSelect" class="custom-select">
                    <option value="">Select Stream</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="BIOTECH">BIOTECH</option>
                </select>

                <select id="solutionSemesterSelect" class="custom-select" disabled>
                    <option value="">Select Semester</option>
                </select>

                <select id="solutionSubjectSelect" class="custom-select" disabled>
                    <option value="">Select Subject</option>
                </select>

                <button id="solutionDownloadBtn" class="dock-style-btn" disabled>
                    <i class="fas fa-external-link-alt"></i>
                    Show Tutorial Soln
                </button>
            </div>
            <div id="solutionLinkStatus" class="status-message"></div>
        </div>
    `;
    initializeTutorialSolutions();
}

function initializeTutorialDownloads() {
    const streamSelect = document.getElementById("tutorialStreamSelect");
    const semesterSelect = document.getElementById("tutorialSemesterSelect");
    const subjectSelect = document.getElementById("tutorialSubjectSelect");
    const downloadBtn = document.getElementById("tutorialDownloadBtn");
    const linkStatus = document.getElementById("tutorialLinkStatus");

    streamSelect.addEventListener("change", () => {
        if (streamSelect.value) {
            semesterSelect.disabled = false;
            populateSemestersnew(semesterSelect, streamSelect.value);
            subjectSelect.disabled = true;
            downloadBtn.disabled = true;
            if (linkStatus) linkStatus.innerHTML = "";
        } else {
            semesterSelect.disabled = true;
            subjectSelect.disabled = true;
            downloadBtn.disabled = true;
        }
    });

    semesterSelect.addEventListener("change", () => {
        if (semesterSelect.value && streamSelect.value) {
            subjectSelect.disabled = false;
            populateSubjects(subjectSelect, streamSelect.value, semesterSelect.value);
            downloadBtn.disabled = true;
            if (linkStatus) linkStatus.innerHTML = "";
        } else {
            subjectSelect.disabled = true;
            downloadBtn.disabled = true;
        }
    });

    subjectSelect.addEventListener("change", () => {
        if (subjectSelect.value) {
            downloadBtn.disabled = false;
            if (linkStatus) linkStatus.innerHTML = "";
        } else {
            downloadBtn.disabled = true;
        }
    });

    downloadBtn.addEventListener("click", () => {
        const stream = streamSelect.value;
        const semester = parseInt(semesterSelect.value);
        const subject = subjectSelect.value;
        
        openDriveLink('tutorial', stream, semester, subject, linkStatus);
    });
}

function initializeTutorialSolutions() {
    const streamSelect = document.getElementById("solutionStreamSelect");
    const semesterSelect = document.getElementById("solutionSemesterSelect");
    const subjectSelect = document.getElementById("solutionSubjectSelect");
    const downloadBtn = document.getElementById("solutionDownloadBtn");
    const linkStatus = document.getElementById("solutionLinkStatus");

    streamSelect.addEventListener("change", () => {
        if (streamSelect.value) {
            semesterSelect.disabled = false;
            populateSemestersnew(semesterSelect, streamSelect.value);
            subjectSelect.disabled = true;
            downloadBtn.disabled = true;
            if (linkStatus) linkStatus.innerHTML = "";
        } else {
            semesterSelect.disabled = true;
            subjectSelect.disabled = true;
            downloadBtn.disabled = true;
        }
    });

    semesterSelect.addEventListener("change", () => {
        if (semesterSelect.value && streamSelect.value) {
            subjectSelect.disabled = false;
            populateSubjects(subjectSelect, streamSelect.value, semesterSelect.value);
            downloadBtn.disabled = true;
            if (linkStatus) linkStatus.innerHTML = "";
        } else {
            subjectSelect.disabled = true;
            downloadBtn.disabled = true;
        }
    });

    subjectSelect.addEventListener("change", () => {
        if (subjectSelect.value) {
            downloadBtn.disabled = false;
            if (linkStatus) linkStatus.innerHTML = "";
        } else {
            downloadBtn.disabled = true;
        }
    });

    downloadBtn.addEventListener("click", () => {
        const stream = streamSelect.value;
        const semester = parseInt(semesterSelect.value);
        const subject = subjectSelect.value;
        
        openDriveLink('solution', stream, semester, subject, linkStatus);
    });
}

function populateSemestersnew(select, stream) {
    if (!select) {
        console.error("Semester select dropdown not found!");
        return;
    }

    select.innerHTML = '<option value="">Select Semester</option>';
    
    // Get available semesters for the selected stream
    const semesters = Object.keys(tutorialSubjectsBySemester[stream] || {}).map(Number).sort((a, b) => a - b);
    
    for (const semester of semesters) {
        const option = document.createElement('option');
        option.value = semester;
        option.textContent = `Semester ${semester}`;
        select.appendChild(option);
    }
}

function populateSubjects(select, stream, semester) {
    if (!select) {
        console.error("Subject select dropdown not found!");
        return;
    }

    select.innerHTML = '<option value="">Select Subject</option>';
    
    const subjects = tutorialSubjectsBySemester[stream]?.[semester] || [];
    
    for (const subject of subjects) {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
        select.appendChild(option);
    }
}

function openDriveLink(type, stream, semester, subject, statusElement) {
    let link;
    
    if (type === 'tutorial') {
        link = tutorialDriveLinks[stream]?.[semester]?.[subject];
    } else if (type === 'solution') {
        link = tutorialSolutionDriveLinks[stream]?.[semester]?.[subject];
    }
    
    if (link) {
        // Open the link in a new tab
        window.open(link, '_blank');
        
        if (statusElement) {
            statusElement.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    Opening Drive folder for ${stream} - Semester ${semester} - ${subject}
                </div>
            `;
        }
    } else {
        console.error(`No drive link found for ${stream} - Semester ${semester} - ${subject}`);
        
        if (statusElement) {
            statusElement.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    No drive link found for this selection. Please contact administrator.
                </div>
            `;
        }
    }
}

// Add this style for status messages
const statusStyle = document.createElement('style');
statusStyle.textContent = `
    .status-message {
        margin-top: 20px;
        text-align: center;
    }
    
    .success-message {
        color: #4CAF50;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(76, 175, 80, 0.1);
    }
    
    .error-message {
        color: #f44336;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(244, 67, 54, 0.1);
    }
    
    .status-message i {
        margin-right: 5px;
    }
`;
document.head.appendChild(statusStyle);
/*------------------------professors------------------------*/

function showProfessors() {
    const Images = document.querySelector('.banner-wrapper');
    Images.style.display = 'none';
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="professors-section">
            <h2 class="section-title" id='name1'>Find Professor Details</h2>
            <div class="professor-search-container">
                <div class="professor-search-card">
                    <i class="fas fa-search fa-3x" id="searchimg"></i>
                    <h3 id='name'>Search Professors</h3>
                    <div class="search-bar">
                        <input type="text" id="professorName" placeholder="Enter Professor's Name">
                        <button onclick="fetchProfessorDetails()">Search</button>
                    </div>
                </div>
            </div>
            <div id="professorCard" class="professor-card">
                <div class="scroll-buttons">
                    <button class="scroll-btn left" onclick="scrollCards('left')" style="display: none;">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="scroll-btn right" onclick="scrollCards('right')" style="display: none;">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <style>
            .professor-cards-container {
                display: flex;
                overflow-x: auto;
                scroll-behavior: smooth;
                padding: 20px;
                position: relative;
                gap: 20px;
            }
            
            .scroll-buttons {
                display: none;
            }
            
         
            .professor-cards-container::-webkit-scrollbar {
                width: 12px; /* Width of the scrollbar */
                height: 12px; /* Height for horizontal scrollbar */
              
            }  
            .professor-cards-container::-webkit-scrollbar-track {
                background: black; /* Track color */
                border-radius: 10px; /* Rounded corners */
            }
            .professor-cards-container::-webkit-scrollbar-track:hover {
                background-color : var(--primary-color); /* Thumb color on hover */
            }
            .professor-cards-container::-webkit-scrollbar-thumb {
                background: #888; /* Thumb color */
                border-radius: 10px; /* Rounded corners */
                border: 3px solid #f1f1f1; /* Padding around the thumb */
            }
            .professor-cards-container::-webkit-scrollbar-thumb:hover {
                background-color : var(--primary-color); /* Thumb color on hover */
            }
           
                        
            
            .professor-card-item {
                flex: 0 0 auto;
                min-width: 300px;
                transition: transform 0.3s;
            }
            
            .professor-card-item:hover {
                transform: translateY(-5px);
            }
        </style>
    `;
}

function fetchProfessorDetails() {
    const nameInput = document.getElementById('professorName').value.toLowerCase().trim();
    const professorCard = document.getElementById('professorCard');
    const img = document.getElementById('searchimg');
    const name = document.getElementById('name');
    const name1 = document.getElementById('name1');
    
    img.style.display = 'none';
    name.style.display = 'none';
    name1.style.display = 'none';
    const dock = document.getElementById('dockc');
    dock.classList.add('class1');
    
    professorCard.innerHTML = `
        <div class="scroll-buttons">
            <button class="scroll-btn left" onclick="scrollCards('left')" style="display: none;">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="scroll-btn right" onclick="scrollCards('right')" style="display: none;">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    if (!nameInput) {
        professorCard.innerHTML += `
            <div class="no-results">
                <i class="fas fa-exclamation-circle fa-3x"></i>
                <p>Please enter a professor's name.</p>
            </div>`;
        return;
    }

    const matchedProfessors = professors.filter(p => p.name.toLowerCase().includes(nameInput));

    if (matchedProfessors.length > 0) {
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('professor-cards-container');
        
        if (matchedProfessors.length === 1) {
            cardsContainer.classList.add('single-card');
        }

        matchedProfessors.forEach(professor => {
            const card = document.createElement('div');
            card.classList.add('professor-card-item');
            card.innerHTML = `
                <img src="${professor.image}" alt="${professor.name}">
                <h4>${professor.name}</h4>
                <div class="professor-details">
                    <p><i class="fas fa-envelope"></i> ${professor.email}</p>
                    <p><i class="fas fa-building"></i> ${professor.department}</p>
                    <p><i class="fas fa-clock"></i> ${professor.experience} years</p>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        professorCard.appendChild(cardsContainer);
        updateScrollButtons();
    } else {
        professorCard.innerHTML += `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <p>No matching professors found. Please try again.</p>
            </div>`;
    }
}

function addProfessorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .professor-cards-container {
            display: flex;
            overflow-x: hidden;
            scroll-behavior: smooth;
            padding: 20px;
            position: relative;
            gap: 20px;
        }

        .professor-cards-container.single-card {
            justify-content: center;
            overflow-x: hidden;
        }

        .professor-card-item {
            flex: 0 0 auto;
            min-width: 300px;
            transition: transform 0.3s;
        }

        .single-card .professor-card-item {
            margin: 0 auto;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    addProfessorStyles();
});

function scrollCards(direction) {
    const container = document.querySelector('.professor-cards-container');
    const scrollAmount = 320; // Width of card + gap
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    setTimeout(updateScrollButtons, 100);
}

function updateScrollButtons() {
    const container = document.querySelector('.professor-cards-container');
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');
    
    if (container) {
        const showLeftButton = container.scrollLeft > 0;
        const showRightButton = container.scrollLeft < (container.scrollWidth - container.clientWidth - 1);
        
        leftBtn.style.display = showLeftButton ? 'block' : 'none';
        rightBtn.style.display = showRightButton ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.professor-cards-container');
    if (container) {
        container.addEventListener('scroll', updateScrollButtons);
    }
});


/*--------------------cgpa--------------------------*/

function showCGPACalculator() {
    const Images = document.querySelector('.banner-wrapper');
    Images.style.display = 'none';
    
    const dock = document.getElementById('dockc');
    dock.classList.add('class1');
    

    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="cgpa-calculator-section">
            <h2 class="section-title">JIIT Target CGPA Calculator</h2>
            <p class="warning-text">Note: Please enter the number of <strong>completed semesters</strong> (e.g., if you're in the 4th semester, enter 3).</p>
            
            <form id="cgpaForm" class="cgpa-form">
                <div class="form-group">
                    <label for="currentCGPA">Current CGPA:</label>
                    <input type="number" id="currentCGPA" step="0.01" required class="custom-input">
                </div>
                
                <div class="form-group">
                    <label for="completedSemesters">Completed Semesters (1-7):</label>
                    <input type="number" id="completedSemesters" min="1" max="7" required class="custom-input">
                </div>
                
                <div class="form-group">
                    <label for="targetCGPA">Target CGPA:</label>
                    <input type="number" id="targetCGPA" step="0.01" required class="custom-input">
                </div>

                <div class="form-group">
                    <label>Enter Credits for Each Semester:</label>
                    <div id="creditsInputs" class="credits-grid">
                        ${Array.from({length: 8}, (_, i) => `
                            <div class="semester-input">
                                <label for="semester${i + 1}">Semester ${i + 1}</label>
                                <input type="number" 
                                    class="custom-input semester-credits" 
                                    id="semester${i + 1}" 
                                    placeholder="Credits" 
                                    required>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button type="button" onclick="calculateSGPA()" class="calculate-btn">
                    Calculate
                </button>
            </form>
        </div>

        <!-- Modal -->
        <div id="resultModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>CGPA Calculation Results</h3>
                <div id="modalResults"></div>
                <button class="close-btn">Close</button>
            </div>
        </div>

        <style>
            .cgpa-calculator-section {
                width: 90%;
                max-width: 800px;
                margin: 0 auto;
                padding: 1rem;
                color: var(--text-light);
            }

            @media (max-width: 768px) {
                .cgpa-calculator-section {
                    width: 95%;
                    padding: 0.5rem;
                }
            }
.section-title {
    font-size: 2rem; /* Reduced from the default size */
    text-align: center; /* Keep centered for visual balance */
    margin-bottom: 1rem;
    color: var(--text-light); /* Maintain consistent color */
}
            .warning-text {
                color: #ff4444;
                margin-bottom: 1.5rem;
                font-size: 0.6rem;
                text-align: center;
            }

            .cgpa-form {
                background-color: #333;
                padding: 1.5rem;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 480px) {
                .cgpa-form {
                    padding: 1rem;
                }
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-light);
            }

            .custom-input {
                width: 85%;
                padding: 0.75rem;
                background-color: #444;
                border: 1px solid #555;
                border-radius: 8px;
                color: var(--text-light);
                transition: all 0.3s ease;
            }

            .custom-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2);
            }

         .credits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Ensure 4 columns fit in one row */
    gap: 0.5rem; /* Reduce gap between inputs */
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .credits-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columns for smaller screens */
        gap: 0.5rem; /* Keep smaller gap for mobile */
    }
}

@media (max-width: 480px) {
    .credits-grid {
        grid-template-columns: 1fr; /* Single column for very small screens */
        gap: 0.75rem; /* Slightly larger gap for single column */
    }
}

.semester-input {
    display: flex;
    flex-direction: column;
    gap: 0.25rem; /* Reduce space between label and input */
}


            .semester-input label {
                font-size: 0.9rem;
                color: var(--text-light);
            }

            .calculate-btn {
                width: 100%;
                padding: 1rem;
                background-color: var(--primary-color);
                color: var(--text-dark);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .calculate-btn:hover {
                background-color: var(--secondary-color);
                transform: translateY(-2px);
            }

            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }

            .modal-content {
                position: relative;
                background-color: #333;
                margin: 15% auto;
                padding: 2rem;
                width: 90%;
                max-width: 600px;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease-out;
            }

            @media (max-width: 768px) {
                .modal-content {
                    margin: 10% auto;
                    padding: 1.5rem;
                    width: 95%;
                }
            }

            .close-modal {
                position: absolute;
                right: 1rem;
                top: 0.5rem;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-light);
            }

            .close-modal:hover {
                color: var(--primary-color);
            }

            .modal h3 {
                color: var(--primary-color);
                margin-bottom: 1.5rem;
                text-align: center;
            }

            #modalResults {
                margin-bottom: 1.5rem;
                color: var(--text-light);
            }

            #modalResults p {
                margin: 0.5rem 0;
                padding: 0.5rem;
                border-radius: 4px;
                background-color: #444;
            }

            #modalResults p.impossible {
                background-color: #ff44444d;
                color: #ff4444;
                font-weight: bold;
            }

            .close-btn {
                display: block;
                width: 100%;
                padding: 0.75rem;
                background-color: var(--primary-color);
                color: var(--text-dark);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                margin-top: 1rem;
            }

            .close-btn:hover {
                background-color: var(--secondary-color);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideIn {
                from { transform: translateY(-20%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;

    // Add event listeners for modal
    const modal = document.getElementById("resultModal");
    const closeBtn = document.querySelector(".close-modal");
    const closeBtnBottom = document.querySelector(".close-btn");

    closeBtn.onclick = () => modal.style.display = "none";
    closeBtnBottom.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function calculateSGPA() {
    const currentCGPA = parseFloat(document.getElementById("currentCGPA").value);
    const completedSemesters = parseInt(document.getElementById("completedSemesters").value);
    const targetCGPA = parseFloat(document.getElementById("targetCGPA").value);

    if (isNaN(currentCGPA) || isNaN(completedSemesters) || isNaN(targetCGPA)) {
        alert("Please enter valid numeric values for all fields.");
        return;
    }

    if (currentCGPA < 0 || currentCGPA > 10 || targetCGPA < 0 || targetCGPA > 10) {
        alert("CGPA values must be between 0 and 10.");
        return;
    }

    if (completedSemesters < 1 || completedSemesters > 7) {
        alert("Completed semesters must be between 1 and 7.");
        return;
    }

    let credits = [];
    for (let i = 1; i <= 8; i++) {
        const credit = parseFloat(document.getElementById("semester" + i).value);
        if (isNaN(credit) || credit <= 0) {
            alert("Please enter valid credits for all semesters.");
            return;
        }
        credits.push(credit);
    }

    let completedCredits = 0;
    for (let i = 0; i < completedSemesters; i++) {
        completedCredits += credits[i];
    }

    const remainingSemesters = credits.slice(completedSemesters);
    const modalResultsDiv = document.getElementById("modalResults");
    modalResultsDiv.innerHTML = "";

    let cumulativeCredits = completedCredits;
    let isAchievableBy8th = true;

    remainingSemesters.forEach((semesterCredits, index) => {
        cumulativeCredits += semesterCredits;
        const semesterNumber = completedSemesters + index + 1;
        const requiredSGPA = (targetCGPA * cumulativeCredits - currentCGPA * completedCredits) / (cumulativeCredits - completedCredits);

        const paragraph = document.createElement("p");
        if (requiredSGPA > 10) {
            paragraph.classList.add("impossible");
            paragraph.textContent = `Semester ${semesterNumber}: Impossible to achieve target CGPA`;
            if (semesterNumber === 8) isAchievableBy8th = false;
        } else {
            paragraph.textContent = `Semester ${semesterNumber}: Required SGPA ${requiredSGPA.toFixed(2)}`;
        }
        modalResultsDiv.appendChild(paragraph);
    });

    if (!isAchievableBy8th) {
        const impossibleMsg = document.createElement("p");
        impossibleMsg.classList.add("impossible");
        impossibleMsg.textContent = "The entered target CGPA is not achievable. You are cooked.";
        modalResultsDiv.appendChild(impossibleMsg);
    }

    // Show the modal
    document.getElementById("resultModal").style.display = "block";
}


document.addEventListener('DOMContentLoaded', initializeSlider);