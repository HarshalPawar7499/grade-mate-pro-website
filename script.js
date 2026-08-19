document.addEventListener("DOMContentLoaded", function () {

    console.log("Grade Mate Pro JavaScript Loaded Successfully");


    // =====================================================
    // CGPA TO PERCENTAGE
    // =====================================================

    const cgpaForm = document.getElementById("cgpaForm");

    if (cgpaForm) {

        cgpaForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const input = document.getElementById("cgpaInput");
            const error = document.getElementById("cgpaError");
            const resultBox = document.getElementById("cgpaResult");
            const resultValue = document.getElementById("percentageResult");

            const cgpa = Number(input.value);

            error.textContent = "";

            if (input.value.trim() === "") {
                error.textContent = "Please enter your CGPA.";
                resultBox.classList.remove("show");
                return;
            }

            if (isNaN(cgpa)) {
                error.textContent = "Please enter a valid CGPA.";
                resultBox.classList.remove("show");
                return;
            }

            if (cgpa < 0 || cgpa > 10) {
                error.textContent = "CGPA must be between 0 and 10.";
                resultBox.classList.remove("show");
                return;
            }

            // CGPA to Percentage
            const percentage = cgpa * 9.5;

            resultValue.textContent = percentage.toFixed(2);

            // SHOW RESULT
            resultBox.classList.add("show");

            // Smooth scroll to result
            setTimeout(function () {
                resultBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 100);

        });
    }


    // =====================================================
    // PERCENTAGE TO CGPA
    // =====================================================

    const percentageForm =
        document.getElementById("percentageForm");

    if (percentageForm) {

        percentageForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const input =
                document.getElementById("percentageInput");

            const error =
                document.getElementById("percentageError");

            const resultBox =
                document.getElementById("percentageResultBox");

            const resultValue =
                document.getElementById("cgpaResultValue");

            const percentage = Number(input.value);

            error.textContent = "";

            if (input.value.trim() === "") {

                error.textContent =
                    "Please enter your percentage.";

                resultBox.classList.remove("show");

                return;
            }

            if (isNaN(percentage)) {

                error.textContent =
                    "Please enter a valid percentage.";

                resultBox.classList.remove("show");

                return;
            }

            if (percentage < 0 || percentage > 100) {

                error.textContent =
                    "Percentage must be between 0 and 100.";

                resultBox.classList.remove("show");

                return;
            }

            // Percentage to CGPA
            let cgpa = percentage / 9.5;

            if (cgpa > 10) {
                cgpa = 10;
            }

            resultValue.textContent =
                cgpa.toFixed(2);

            resultBox.classList.add("show");

            setTimeout(function () {

                resultBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);

        });
    }


    // =====================================================
    // SGPA CALCULATOR
    // =====================================================

    const addSubjectButton =
        document.getElementById("addSubject");

    const calculateSGPAButton =
        document.getElementById("calculateSGPA");

    const subjectTable =
        document.getElementById("subjectTableBody");


    function updateSubjectNumbers() {

        if (!subjectTable) return;

        const rows =
            subjectTable.querySelectorAll("tr");

        rows.forEach(function (row, index) {

            row.cells[0].textContent =
                index + 1;

        });
    }


    function createSubject() {

        if (!subjectTable) return;

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td></td>

            <td>
                <input
                    type="text"
                    class="subject-name"
                    placeholder="Subject name"
                >
            </td>

            <td>
                <input
                    type="number"
                    class="credit-input"
                    min="0.5"
                    max="20"
                    step="0.5"
                    placeholder="4"
                >
            </td>

            <td>
                <input
                    type="number"
                    class="grade-input"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="8"
                >
            </td>

            <td>
                <button
                    type="button"
                    class="remove-row"
                    title="Remove subject"
                >
                    <i class="bi bi-trash"></i>
                </button>
            </td>

        `;

        subjectTable.appendChild(row);

        updateSubjectNumbers();
    }


    if (addSubjectButton) {

        addSubjectButton.addEventListener(
            "click",
            function () {

                createSubject();

            }
        );

    }


    // Remove Subject

    document.addEventListener("click", function (e) {

        const removeButton =
            e.target.closest(".remove-row");

        if (!removeButton) return;

        const rows =
            document.querySelectorAll(
                "#subjectTableBody tr"
            );

        if (rows.length <= 1) {

            const error =
                document.getElementById("sgpaError");

            if (error) {

                error.textContent =
                    "At least one subject is required.";

            }

            return;
        }

        removeButton
            .closest("tr")
            .remove();

        updateSubjectNumbers();

    });


    // Calculate SGPA

    if (calculateSGPAButton) {

        calculateSGPAButton.addEventListener(
            "click",
            function () {

                const rows =
                    document.querySelectorAll(
                        "#subjectTableBody tr"
                    );

                const error =
                    document.getElementById("sgpaError");

                const totalCreditsElement =
                    document.getElementById("totalCredits");

                const weightedPointsElement =
                    document.getElementById(
                        "weightedPoints"
                    );

                const sgpaElement =
                    document.getElementById("sgpaValue");


                error.textContent = "";

                let totalCredits = 0;

                let weightedPoints = 0;

                let validSubjects = 0;


                rows.forEach(function (row) {

                    const creditInput =
                        row.querySelector(
                            ".credit-input"
                        );

                    const gradeInput =
                        row.querySelector(
                            ".grade-input"
                        );


                    const credit =
                        Number(creditInput.value);

                    const grade =
                        Number(gradeInput.value);


                    creditInput.style.borderColor = "";

                    gradeInput.style.borderColor = "";


                    if (
                        creditInput.value === "" &&
                        gradeInput.value === ""
                    ) {
                        return;
                    }


                    if (
                        isNaN(credit) ||
                        isNaN(grade)
                    ) {

                        creditInput.style.borderColor =
                            "#dc3545";

                        gradeInput.style.borderColor =
                            "#dc3545";

                        return;
                    }


                    if (
                        credit <= 0 ||
                        credit > 20
                    ) {

                        creditInput.style.borderColor =
                            "#dc3545";

                        return;
                    }


                    if (
                        grade < 0 ||
                        grade > 10
                    ) {

                        gradeInput.style.borderColor =
                            "#dc3545";

                        return;
                    }


                    totalCredits += credit;

                    weightedPoints +=
                        credit * grade;

                    validSubjects++;

                });


                if (validSubjects === 0) {

                    error.textContent =
                        "Please enter valid credit and grade point values.";

                    return;
                }


                const sgpa =
                    weightedPoints /
                    totalCredits;


                totalCreditsElement.textContent =
                    totalCredits.toFixed(2);

                weightedPointsElement.textContent =
                    weightedPoints.toFixed(2);

                sgpaElement.textContent =
                    sgpa.toFixed(2);


                // Smooth scroll to result

                sgpaElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }


    // =====================================================
    // STUDY TIMER
    // =====================================================

    const timerDisplay =
        document.getElementById(
            "timerDisplay"
        );

    const minutesInput =
        document.getElementById(
            "minutesInput"
        );

    const startTimer =
        document.getElementById(
            "startTimer"
        );

    const pauseTimer =
        document.getElementById(
            "pauseTimer"
        );

    const resetTimer =
        document.getElementById(
            "resetTimer"
        );

    const timerStatus =
        document.getElementById(
            "timerStatus"
        );


    if (
        timerDisplay &&
        minutesInput &&
        startTimer &&
        pauseTimer &&
        resetTimer
    ) {

        let interval = null;

        let remainingSeconds =
            Number(minutesInput.value) * 60;


        function displayTimer() {

            const minutes =
                Math.floor(
                    remainingSeconds / 60
                );

            const seconds =
                remainingSeconds % 60;


            timerDisplay.textContent =

                String(minutes).padStart(2, "0")
                + ":" +
                String(seconds).padStart(2, "0");

        }


        function stopTimer() {

            clearInterval(interval);

            interval = null;

        }


        minutesInput.addEventListener(
            "input",
            function () {

                if (interval) return;

                let minutes =
                    Number(this.value);

                if (
                    isNaN(minutes) ||
                    minutes < 1
                ) {
                    minutes = 1;
                }

                if (minutes > 180) {
                    minutes = 180;
                    this.value = 180;
                }

                remainingSeconds =
                    minutes * 60;

                timerStatus.textContent =
                    "Ready to study";

                displayTimer();

            }
        );


        startTimer.addEventListener(
            "click",
            function () {

                if (interval) return;


                if (remainingSeconds <= 0) {

                    let minutes =
                        Number(
                            minutesInput.value
                        );

                    if (
                        isNaN(minutes) ||
                        minutes < 1
                    ) {
                        minutes = 25;

                        minutesInput.value =
                            25;
                    }

                    remainingSeconds =
                        minutes * 60;

                }


                timerStatus.textContent =
                    "Focus mode — Study now!";


                interval =
                    setInterval(
                        function () {

                            if (
                                remainingSeconds > 0
                            ) {

                                remainingSeconds--;

                                displayTimer();

                            } else {

                                stopTimer();

                                timerStatus.textContent =
                                    "Session completed! 🎉";

                                displayTimer();

                                alert(
                                    "Study session completed! Great work."
                                );

                            }

                        },
                        1000
                    );

            }
        );


        pauseTimer.addEventListener(
            "click",
            function () {

                if (interval) {

                    stopTimer();

                    timerStatus.textContent =
                        "Timer paused";

                }

            }
        );


        resetTimer.addEventListener(
            "click",
            function () {

                stopTimer();

                let minutes =
                    Number(
                        minutesInput.value
                    );

                if (
                    isNaN(minutes) ||
                    minutes < 1
                ) {

                    minutes = 25;

                    minutesInput.value =
                        25;
                }


                if (minutes > 180) {

                    minutes = 180;

                    minutesInput.value =
                        180;
                }


                remainingSeconds =
                    minutes * 60;

                timerStatus.textContent =
                    "Ready to study";

                displayTimer();

            }
        );


        displayTimer();

    }


    // =====================================================
    // LIVE CLOCK
    // =====================================================

    const liveTime =
        document.getElementById(
            "liveTime"
        );

    const liveDate =
        document.getElementById(
            "liveDate"
        );


    if (liveTime && liveDate) {


        function updateLiveClock() {

            const now =
                new Date();


            const time =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    }
                );


            const date =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            liveTime.textContent =
                time;

            liveDate.textContent =
                date;

        }


        updateLiveClock();

        setInterval(
            updateLiveClock,
            1000
        );

    }


});