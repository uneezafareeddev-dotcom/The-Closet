// ==========================================
// THE CLOSET — Contact Page Logic
// ==========================================

// ---------- 1. Helpers ----------
function showToast(message, icon = "fa-check") {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    document.getElementById("toastContainer").appendChild(toast);
    setTimeout(() => {
        toast.classList.add("out");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ---------- 2. Navbar Cart Badge (localStorage sync) ----------
const cart = JSON.parse(localStorage.getItem("tc_cart")) || [];
const cartCountBadge = document.getElementById("cartCount");

if (cartCountBadge) {
    cartCountBadge.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

// ---------- 3. Contact Form Elements ----------
const contactForm = document.getElementById("contactForm");
const cName    = document.getElementById("cName");
const cEmail   = document.getElementById("cEmail");
const cPhone   = document.getElementById("cPhone");
const cSubject = document.getElementById("cSubject");
const cMessage = document.getElementById("cMessage");
const charCount  = document.getElementById("charCount");
const sendBtn    = document.getElementById("sendBtn");

const msgSuccessOverlay = document.getElementById("msgSuccessOverlay");

// ---------- 4. Character Counter 🔢 ----------
cMessage.addEventListener("input", () => {
    const len = cMessage.value.length;
    charCount.textContent = len;

    const counterWrap = charCount.parentElement;

    // Color change: 400+ warning, 500 = red
    counterWrap.classList.toggle("warning", len >= 400 && len < 480);
    counterWrap.classList.toggle("limit", len >= 480);
});

// ---------- 5. Real-time Validation ----------
function setError(inputEl, hasError) {
    const group = inputEl.closest(".form-group");
    group.classList.toggle("error", hasError);
    group.classList.toggle("valid", !hasError && inputEl.value.trim() !== "");
    return !hasError;
}

function validateField(inputEl) {
    const value = inputEl.value.trim();

    switch (inputEl.id) {
        case "cName":
            return setError(inputEl, value.length < 3);
        case "cEmail":
            return setError(inputEl, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        case "cSubject":
            return setError(inputEl, value === "");
        case "cMessage":
            return setError(inputEl, value.length < 10);
        default:
            return true;
    }
}

// Blur par validate + typing par error clear
[cName, cEmail, cSubject, cMessage].forEach((input) => {
    input.addEventListener("blur", () => {
        if (input.value.trim() !== "") validateField(input);
    });

    input.addEventListener("input", () => {
        // Agar error state mein hai aur user type kar raha hai — re-validate live
        if (input.closest(".form-group").classList.contains("error")) {
            validateField(input);
        }
    });
});

// ---------- 6. Form Submit ----------
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Saare fields validate karo
    const validations = [
        validateField(cName),
        validateField(cEmail),
        validateField(cSubject),
        validateField(cMessage)
    ];

    if (validations.includes(false)) {
        showToast("Please fix the highlighted fields!", "fa-triangle-exclamation");

        // Pehle error field tak smooth scroll
        const firstError = document.querySelector(".form-group.error");
        if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            const errInput = firstError.querySelector("input, select, textarea");
            if (errInput) errInput.focus({ preventScroll: true });
        }
        return;
    }

    // Button loading state
    const btnText   = sendBtn.querySelector(".btn-text");
    const btnLoader = sendBtn.querySelector(".btn-loader");
    btnText.style.display = "none";
    btnLoader.style.display = "inline-flex";
    sendBtn.disabled = true;

    // Sending simulate (1.5s)
    setTimeout(() => {
        // Message localStorage mein save (future "messages inbox" ke liye)
        const messages = JSON.parse(localStorage.getItem("tc_messages")) || [];
        messages.push({
            name: cName.value.trim(),
            email: cEmail.value.trim(),
            phone: cPhone.value.trim(),
            subject: cSubject.value,
            message: cMessage.value.trim(),
            date: new Date().toISOString()
        });
        localStorage.setItem("tc_messages", JSON.stringify(messages));

        // Success modal fill + show
        document.getElementById("senderName").textContent = cName.value.trim().split(" ")[0];
        document.getElementById("senderEmail").textContent = cEmail.value.trim();
        msgSuccessOverlay.classList.add("active");
        document.body.style.overflow = "hidden";

        // Button reset + plane fly animation 🛫
        btnText.style.display = "inline-flex";
        btnLoader.style.display = "none";
        sendBtn.classList.add("sent");
        sendBtn.disabled = false;

        // Form reset
        contactForm.reset();
        charCount.textContent = "0";
        document.querySelectorAll(".form-group").forEach((g) => {
            g.classList.remove("error", "valid");
        });

        // Fly animation class remove
        setTimeout(() => sendBtn.classList.remove("sent"), 900);

        showToast("Message sent successfully! 🎉", "fa-paper-plane");
    }, 1500);
});

// ---------- 7. Success Modal Close ----------
document.getElementById("successCloseBtn").addEventListener("click", () => {
    msgSuccessOverlay.classList.remove("active");
    document.body.style.overflow = "";
});

msgSuccessOverlay.addEventListener("click", (e) => {
    if (e.target === msgSuccessOverlay) {
        msgSuccessOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});

// ---------- 8. FAQ Accordion 📖 ----------
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Baaki saare close karo (accordion behaviour)
        faqItems.forEach((other) => {
            other.classList.remove("open");
            other.querySelector(".faq-answer").style.maxHeight = null;
        });

        // Clicked item open karo (agar pehle se open nahi tha)
        if (!isOpen) {
            item.classList.add("open");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// ---------- 9. CTA "Ask a Question" → form tak scroll ----------
document.querySelectorAll('a[href="#contactForm"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        contactForm.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => cName.focus({ preventScroll: true }), 700);
    });
});

// ---------- 10. ESC Key = Modal Close ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        msgSuccessOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});