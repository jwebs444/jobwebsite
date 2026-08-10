<script>
    import ProjectCard from "./ProjectCard.svelte";
    import { featuredProjects } from "$lib/projects";

    let benefits = [
        {name: 'a self-taught developer.', description: "I embarked on my coding journey during my graduate studies when I discovered R as a powerful tool for analyzing extensive datasets. When faced with funding challenges due to the impact of Covid-19 on my education, I turned to leveraging my programming and analytical skills. Through self-study, I quickly grasped the fundamentals of Python and SQL, marveling at their versatility and user-friendly nature. Determined to transition into the tech industry, I enrolled in a comprehensive boot camp covering Python, SQL, and DevOps to bolster my skill set and enhance my competitiveness as a tech professional. Presently, I'm deepening my expertise in back-end infrastructure while exploring front-end frameworks like JavaScript to broaden my technical horizons."},
        {name: 'a data specialist.', description: "I am proficient in an extensive array of data analysis techniques, drawing particular strengths from my expertise in regression and factor analysis. Leveraging years of hands-on experience, I excel in deriving actionable insights from complex datasets, enabling data-driven decision-making. Furthermore, my proficiency extends beyond analysis—I have a proven track record in building and managing relational databases, including overseeing a robust database sourced firsthand from extensive in-person interactions with thousands of participants."},
        {name: 'an excellent collaborator.', description: "I thrive as both a team player and a leader by consistently fostering strong alliances and synergies. During my professional journey, I've cultivated an extensive web of personal and professional relationships spanning diverse industries. These connections stand as a testament to my ability to forge meaningful partnerships, enabling me to leverage a vast network to achieve collective goals that surpass individual aspirations. My network serves as a cornerstone of my success, empowering me to accomplish multifaceted objectives beyond the scope of solitary endeavors."}
    ]
</script>

<main class="flex flex-col flex-1 p-4">
    <section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
        <div class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap=10">
            <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
                Hi! I'm <span class="poppins text-violet-400">Jason</span> Weber <br/>Full Stack <span class="poppins text-violet-400">Developer</span>
            </h2>

            <p class="text-base sm:text-lg md:text-xl">
                My <span class="poppins text-violet-400">favorite tools</span> include JavaScript, SvelteKit, Tailwind CSS, FastAPI, Docker, Cloudflare, and PostgreSQL.
            </p>

            <a 
            href="https://www.linkedin.com/in/jason-weber-data/" 
            target="_blank"
            class="blueShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950 cursor-pointer"
        >
    
            <div 
                class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
            />
            <h4 class="relative z-9">Get in touch &rarr;</h4>
        </a>
        </div>
        <div class="relative shadow-2xl grid place-items-center">
            <img
                src={"images/profile.png"}
                alt="Portrait of Jason Weber"
                class="object-cover z-[2] max-h-[70vh]"
            />
        </div>
    </section>
    <section class="py-20 lg:py-32" id="projects">
        <div class="mx-auto max-w-3xl text-center">
            <p class="poppins text-sm font-semibold uppercase tracking-[0.24em] text-violet-300">
                Featured work
            </p>
            <h3 class="mt-4 font-semibold text-3xl sm:text-4xl md:text-5xl">
                Projects built around <span class="poppins text-violet-400">real decisions</span>
            </h3>
            <p class="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Two Python projects that show how I model systems, integrate external data, improve reliability, and turn feedback into tested code.
            </p>
        </div>

        <div class="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {#each featuredProjects as project}
                <ProjectCard {project} />
            {/each}
        </div>
    </section>
    <section id="about" class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 med:gap-24 relative">
        <div class="flex flex-col gap-2 text-center relative 
            before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 
            after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4"
        >
    <h6 class="text-lg sm:text-xl md:text-2xl">Want to know more?</h6>
    <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">A bit <span class='poppins text-violet-400'>about</span> me</h3>
    </div>
    <p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl"> I am . . .</p>
    <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px] ">
        {#each benefits as benefit, index}
        <div class="flex gap-6 sm:gap-8">
            <p class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold">
                0{index+1}
            </p>
            <div class="flex flex-col gap-6 sm:gap-8">
                <h3 class="text-2xl sm:text-3xl md:text-5xl">{benefit.name}</h3>
                <p>{benefit.description}</p>
            </div>
        </div>
        {/each}
    </div>
    <h5 class={" text-2xl sm:text-3xl font-semibold text-center poppins "}>
        The <span class="text-violet-400">Complete</span> Package
    </h5>
    <div
        class="flex flex-col overflow-x-scroll gap-10 max-w-[800px] mx-auto w-full"
    >
        <table class="bg-white text-slate-700 rounded text-center">
            <thead class={"border-b border-solid border-slate-200  "}>
                <tr class="">
                    <th />
                    <th class="whitespace-nowrap p-2 px-4">Candidate #1</th>
                    <th class="whitespace-nowrap p-2 px-4">Candidate #2</th>
                    <th class="whitespace-nowrap p-2 px-4">Candidate #3</th>
                    <th
                        class="bg-violet-700 text-white whitespace-nowrap p-4 px-8"
                        >Me</th
                    >
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-solid border-slate-200">
                    <td
                        class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm"
                        >Dedication</td
                    >
                    <td><i class="fa-solid fa-xmark text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-xmark text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-green-500" /></td>
                </tr>
                <tr class="border-b border-solid border-slate-200">
                    <td
                        class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm"
                        >Critical Thought</td
                    >
                    <td><i class="fa-solid fa-xmark text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-green-500" /></td>
                </tr>
                <tr>
                    <td
                        class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm"
                        >Interpersonal Skills</td
                    >
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-xmark text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-green-500" /></td>
                </tr>
                <tr class="border-t border-solid border-slate-200">
                    <td
                        class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm"
                        >Programming Ability</td
                    >
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-xmark text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-slate-500" /></td>
                    <td><i class="fa-solid fa-check text-green-500" /></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mx-auto -mt-12 italic sm:hidden opacity-50">
        <p>Scroll to see more &rarr;</p>
    </div>
    <p class="mx-auto">So why not invest?</p>
    </section>
</main>
