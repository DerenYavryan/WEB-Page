// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 243, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

const componentsData = {
    cpu: {
        title: "Central Processing Unit (CPU)",
        analogy: "The Brain of the Computer",
        desc: "The CPU is responsible for executing instructions and performing calculations. Just like your brain controls your body and processes thoughts, the CPU manages all the tasks and data flow within the computer. It tells other components what to do and when to do it.\n\nModern CPUs contain multiple cores (typically 4-16 for consumer models, up to 64+ for workstation processors), allowing them to handle multiple tasks simultaneously. Clock speeds range from 2.5 GHz to 5+ GHz, with higher speeds enabling faster processing. Key features include cache memory (L1, L2, L3) for quick data access, and technologies like hyper-threading that allow each core to handle multiple threads.\n\nPopular Brands:\n• Intel - Known for Core i3/i5/i7/i9 series, Xeon workstation processors\n• AMD - Ryzen series (consumer), Threadripper (enthusiast), EPYC (server)\n• Apple - M-series chips (M1, M2, M3) for Mac computers\n• Qualcomm - Snapdragon processors for mobile and ARM-based PCs"
    },
    gpu: {
        title: "Graphics Processing Unit (GPU)",
        analogy: "The Artist / Visual Cortex",
        desc: "The GPU handles rendering images, video, and 3D graphics. While the CPU is good at general tasks, the GPU is specialized for parallel processing needed for visuals. Think of it as a highly skilled artist drawing millions of pixels on your screen every second.\n\nGPUs contain thousands of smaller cores designed for parallel processing, making them ideal for graphics rendering, video editing, 3D modeling, and AI/machine learning tasks. Modern GPUs feature dedicated ray tracing cores for realistic lighting, tensor cores for AI acceleration, and VRAM (video memory) ranging from 4GB to 24GB+ for handling large textures and complex scenes.\n\nPopular Brands:\n• NVIDIA - GeForce RTX/GTX series (gaming), Quadro/RTX A-series (professional), Tesla (data center)\n• AMD - Radeon RX series (gaming), Radeon Pro (professional)\n• Intel - Arc series (gaming), Iris Xe (integrated graphics)\n• Apple - Integrated GPUs in M-series chips"
    },
    ram: {
        title: "Random Access Memory (RAM)",
        analogy: "Short-term Memory (Workbench)",
        desc: "RAM is where the computer stores data that is currently being used. It's super fast but volatile (data is lost when power is off). Imagine a workbench: the bigger it is, the more tools and projects you can have out at once without having to go back to the storage closet.\n\nRAM operates at extremely high speeds (measured in MHz, typically 2400-6000 MHz for DDR4/DDR5) with low latency. Common capacities range from 8GB (basic use) to 16-32GB (gaming/productivity) to 64GB+ (professional workstations). The latest DDR5 standard offers higher bandwidth and improved power efficiency compared to DDR4.\n\nPopular Brands:\n• Corsair - Vengeance, Dominator series\n• G.Skill - Trident Z, Ripjaws series\n• Kingston - HyperX, Fury series\n• Crucial - Ballistix series\n• Teamgroup - T-Force series\n• Samsung - High-performance modules and OEM memory"
    },
    storage: {
        title: "Storage (SSD/HDD)",
        analogy: "Long-term Memory (Closet/Library)",
        desc: "This is where all your files, photos, and operating system live permanently. An SSD (Solid State Drive) is like a modern, high-speed library where you can find books instantly, while an HDD (Hard Disk Drive) is like an older archive room.\n\nSSDs use flash memory with no moving parts, offering read/write speeds of 500-7000+ MB/s (depending on interface: SATA, NVMe PCIe 3.0/4.0/5.0). They're faster, more durable, and energy-efficient but more expensive per GB. HDDs use spinning magnetic platters, offering larger capacities (up to 20TB+) at lower costs but slower speeds (100-200 MB/s) and are more susceptible to physical damage.\n\nPopular Brands:\n• Samsung - 980/990 PRO NVMe SSDs, 870 EVO SATA SSDs\n• Western Digital - WD Black (performance), WD Blue (mainstream), WD Red (NAS)\n• Crucial - MX/P-series SSDs\n• Seagate - Barracuda, IronWolf (NAS), FireCuda (hybrid)\n• Kingston - KC series, A2000 NVMe\n• Sabrent - Rocket series high-performance NVMe"
    },
    motherboard: {
        title: "Motherboard",
        analogy: "The Nervous System / Backbone",
        desc: "The motherboard is the main circuit board that connects all the other components together. It allows the CPU, RAM, GPU, and storage to talk to each other. It provides the pathways (traces) for data and power to travel.\n\nMotherboards come in different form factors (ATX, Micro-ATX, Mini-ITX) and chipsets that determine compatibility and features. They include PCIe slots for GPUs and expansion cards, M.2 slots for NVMe SSDs, RAM slots (typically 2-4 for consumer boards), USB ports, audio jacks, network ports, and power connectors. Premium boards feature better VRMs (voltage regulation modules) for stable power delivery, enhanced cooling, RGB lighting, and Wi-Fi/Bluetooth connectivity.\n\nPopular Brands:\n• ASUS - ROG (Republic of Gamers), TUF Gaming, Prime series\n• MSI - MPG, MAG, PRO series\n• Gigabyte - AORUS (gaming), Ultra Durable series\n• ASRock - Taichi, Phantom Gaming series\n• EVGA - Classified, FTW series\n• Biostar - Racing series"
    },
    psu: {
        title: "Power Supply Unit (PSU)",
        analogy: "The Heart / Digestive System",
        desc: "The PSU converts electricity from your wall outlet into usable power for the computer's internal components. Just as the heart pumps blood to keep organs alive, the PSU delivers energy to keep the PC running.\n\nPSUs are rated by wattage (typically 450W-1200W+ for consumer systems) and efficiency (80 PLUS Bronze, Silver, Gold, Platinum, Titanium certifications). Higher efficiency means less wasted energy as heat. Modular PSUs allow you to connect only the cables you need for cleaner cable management. Quality PSUs include protections against over-voltage, under-voltage, over-current, and short circuits to safeguard your components.\n\nPopular Brands:\n• Corsair - RM, HX, AX series\n• EVGA - SuperNOVA series\n• Seasonic - Focus, Prime series\n• Thermaltake - Toughpower series\n• be quiet! - Straight Power, Dark Power series\n• Cooler Master - MWE, V series\n• Silverstone - Strider, Essential series"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalAnalogy = document.getElementById('modal-analogy');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');

    // Open Modal
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const componentKey = card.getAttribute('data-component');
            const data = componentsData[componentKey];

            if (data) {
                modalTitle.textContent = data.title;
                modalAnalogy.textContent = data.analogy;
                modalDesc.textContent = data.desc;

                // Get the background image from the card and apply to modal
                const cardImg = card.querySelector('.card-image-placeholder');
                const bgStyle = window.getComputedStyle(cardImg).backgroundImage;
                modalImg.style.backgroundImage = bgStyle;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
