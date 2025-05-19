const UI = {
  init() {
    this.switchTab('surveyTab');
    const saved = localStorage.getItem('theme') || 'light';
    this.changeTheme(saved);
    document.getElementById('themeSelect').value = saved;
  },

  switchTab(tabId) {
    const tabs = ['surveyTab', 'voteTab', 'resultsTab', 'themeTab'];
    tabs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
    document.getElementById(tabId)?.classList.remove('hidden');

    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick')?.includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');

    if (tabId === 'voteTab') this.loadVoteTab();
    if (tabId === 'resultsTab') this.loadResultsTab();
  },

  async saveSurvey() {
    const title = document.getElementById("surveyTitle").value.trim();
    if (!title) return alert("Enter a survey title!");

    const questions = [];
    document.querySelectorAll("#questionsContainer > div").forEach(block => {
      const question = block.querySelector(".questionText").value.trim();
      const options = Array.from(block.querySelectorAll(".optionInput"))
        .map(i => i.value.trim())
        .filter(Boolean);
      if (question && options.length >= 2) {
        questions.push({
          text: question,
          options: options,
          votes: Array(options.length).fill(0)
        });
      }
    });

    if (!questions.length) return alert("Add at least one valid question.");

    await fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, questions })
    });

    alert("✅ Survey saved!");
    document.getElementById("surveyTitle").value = "";
    document.getElementById("questionsContainer").innerHTML = "";
  },

  addQuestion() {
    const container = document.getElementById("questionsContainer");
    const index = container.children.length + 1;

    const qBlock = document.createElement("div");
    qBlock.classList.add("question-block");

    qBlock.innerHTML = `
      <input type="text" placeholder="Question ${index}" class="questionText" />
      <div class="optionsContainer">
        <input type="text" placeholder="Option 1" class="optionInput" />
        <input type="text" placeholder="Option 2" class="optionInput" />
      </div>
      <button type="button" onclick="UI.addOption(this)">+ Add Option</button>
      <hr />
    `;

    container.appendChild(qBlock);
  },

  addOption(button) {
    const container = button.parentElement.querySelector(".optionsContainer");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = `Option ${container.children.length + 1}`;
    newInput.classList.add("optionInput");
    container.appendChild(newInput);
  },

  async loadVoteTab() {
    const res = await fetch('/api/polls');
    const polls = await res.json();
    const list = document.getElementById('surveyList');
    list.innerHTML = '';

    polls.forEach((poll, index) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = poll.title;
      btn.onclick = () => UI.startVoting(index);
      li.appendChild(btn);
      list.appendChild(li);
    });
  },

  async startVoting(pollIndex) {
    const res = await fetch('/api/polls');
    const polls = await res.json();
    const poll = polls[pollIndex];

    this.currentPollIndex = pollIndex;
    document.getElementById('voteTitle').textContent = poll.title;
    const form = document.getElementById('votingForm');
    form.innerHTML = '';

    poll.questions.forEach((q, qi) => {
      const fieldset = document.createElement('fieldset');
      const legend = document.createElement('legend');
      legend.textContent = q.text;
      fieldset.appendChild(legend);

      q.options.forEach((opt, oi) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${qi}`;
        input.value = oi;
        label.appendChild(input);
        label.append(` ${opt}`);
        fieldset.appendChild(label);
        fieldset.appendChild(document.createElement('br'));
      });

      form.appendChild(fieldset);
    });

    document.getElementById('votingSection').classList.remove('hidden');
  },

  async submitVote() {
    const form = document.getElementById('votingForm');
    const answers = [];
    form.querySelectorAll('fieldset').forEach((fs, i) => {
      const selected = fs.querySelector('input:checked');
      answers[i] = selected ? parseInt(selected.value) : -1;
    });

    await fetch(`/api/vote/${this.currentPollIndex}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    });

    alert('✅ Vote submitted!');
    document.getElementById('votingSection').classList.add('hidden');
  },

  async loadResultsTab() {
    const res = await fetch('/api/polls');
    const polls = await res.json();
    const list = document.getElementById('resultsList');
    list.innerHTML = '';

    polls.forEach((poll, index) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = poll.title;
      btn.onclick = () => UI.showResults(index);
      li.appendChild(btn);
      list.appendChild(li);
    });
  },

  async showResults(index) {
    const res = await fetch(`/api/results/${index}`);
    const poll = await res.json();
    const section = document.getElementById('resultsSection');

    let html = `<h3>${poll.title}</h3>`;
    poll.questions.forEach(q => {
      html += `<h4>${q.text}</h4><ul>`;
      q.options.forEach((opt, i) => {
        html += `<li>${opt}: <strong>${q.votes[i]}</strong></li>`;
      });
      html += '</ul>';
    });

    section.innerHTML = html;
  },

  changeTheme(theme) {
    const themes = ['light', 'dark', 'solar'];
    themes.forEach(t => document.body.classList.remove(`${t}-theme`));
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }
};