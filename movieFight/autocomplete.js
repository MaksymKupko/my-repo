const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector("input");
    const dropdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector(".results");

    const onInput = async ({ target }) => {
        const items = await fetchData(target.value);

        if (!items.length) {
            dropdown.classList.remove("is-active");
            return;
        }

        resultsWrapper.innerHTML = "";
        dropdown.classList.add("is-active");

        const itemsArr = items.map((item) => {
            const option = document.createElement("a");
            option.classList.add("dropdown-item");
            option.addEventListener("click", () => {
                dropdown.classList.remove("is-active");
                input.value = inputValue(item);
                onOptionSelect(item);
            });
            option.innerHTML = renderOption(item);

            return option;
        });

        resultsWrapper.append(...itemsArr);
    };

    input.addEventListener("input", debounce(onInput, 500));

    document.addEventListener("click", ({ target }) => {
        if (!root.contains(target)) {
            dropdown.classList.remove("is-active");
        }
    });
};
