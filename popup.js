const expandAllBtn = document.querySelector('.expand_all');
const expandTargetBtn = document.querySelector('.expand_target');
const expandSchemasBtn = document.querySelector('.expand_schemas');

let selectMode = false;
let selectedTargetEl;

const openMenu = (targetEl, type = 'all') => {

};

expandAllBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const rootExpandMenu = document.querySelectorAll('.opblock-summary-control[aria-expanded=false]');

      rootExpandMenu?.forEach((el) => el.click());

      setTimeout(() => {
        const schemaMenu = document.querySelectorAll('.tablinks[data-name=model]');
        schemaMenu.forEach((el) => el.click());


        new Array(3).fill(0).forEach(() => {
          const propsMenu = document.querySelectorAll('span.model button.model-box-control[aria-expanded=false]');

          propsMenu?.forEach((el) => el.click());
        });

        const schemasMenu = document.querySelectorAll('.model-box-control[aria-expanded=false]')

        schemasMenu?.forEach((el) => el.click());

        setTimeout(() => {
          const schemasMenu = document.querySelectorAll('.model-box-control[aria-expanded=false]')

          schemasMenu?.forEach((el) => el.click());
        }, 1000);
      }, 1000);
    }
  })
});

expandTargetBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      document.documentElement.classList.add('select_mode');

      window.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (document.documentElement.classList.contains('select_mode')) {
          const clickedTargetEl = e.target;
          const parentEl = clickedTargetEl.parentElement;

          if (parentEl.classList.contains('opblock-summary-control')) {
            const rootExpandMenu = parentEl.querySelectorAll('.opblock-summary-control[aria-expanded=false]');

            rootExpandMenu?.forEach((el) => el.click());

            setTimeout(() => {
              const schemaMenu = document.querySelectorAll('.tablinks[data-name=model]');
              schemaMenu.forEach((el) => el.click());


              new Array(3).fill(0).forEach(() => {
                const propsMenu = document.querySelectorAll('span.model button.model-box-control[aria-expanded=false]');

                propsMenu?.forEach((el) => el.click());
              });
            }, 1000);
          } else {
            alert('열 수 있는 메뉴 타겟을 선택하세요.');
          }
        }

        document.documentElement.classList.remove('select_mode');

        return;
      });
    }
  });
});

expandSchemasBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const schemasMenu = document.querySelectorAll('.model-box-control[aria-expanded=false]')

      schemasMenu?.forEach((el) => el.click());

      setTimeout(() => {
        const schemasMenu = document.querySelectorAll('.model-box-control[aria-expanded=false]')

        schemasMenu?.forEach((el) => el.click());
      }, 1000);
    }
  });
});
