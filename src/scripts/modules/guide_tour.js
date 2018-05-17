import introJs from 'intro.js';

function getBbox(elements) {
  let xmin = Infinity;
  let xmax = -Infinity;
  let ymin = Infinity;
  let ymax = -Infinity;
  for (let i = 0, n_elem = elements.length; i < n_elem; i++) {
    const bbox = elements[i].getBoundingClientRect();
    if (bbox.left < xmin) xmin = bbox.left;
    if (bbox.right > xmax) xmax = bbox.right;
    if (bbox.top < ymin) ymin = bbox.top;
    if (bbox.bottom > ymax) ymax = bbox.bottom;
  }
  return {
    xmin, xmax, ymin, ymax,
  };
}

function makeDivSizeElements(elements, padding) {
  let {
    xmin, xmax, ymin, ymax,
  } = getBbox(elements);
  const elem = document.createElement('div');
  elem.className = 'temp_tour_overlay';
  elem.style.position = 'absolute';
  elem.style.left = `${xmin - padding}px`;
  elem.style.top = `${ymin - padding}px`;
  elem.style.width = `${padding + xmax - xmin}px`;
  elem.style.height = `${padding + ymax - ymin}px`;
  document.body.insertBefore(elem, document.querySelector('#overlay'));
  return elem;
}

export default function makeTour() {
  const elem_top_chart = makeDivSizeElements(
    document.querySelectorAll('#header_chart > img'), 10);
  const elem_top_map = makeDivSizeElements(
    document.querySelectorAll('#header_map > img'), 10);

  const tour = introJs.introJs();
  tour.setOption('scrollToElement', false);
  tour.setOption('keyboardNavigation', true);
  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('#menu.t1'),
    intro: '<p class="titlestep">La partie de gauche est consacré aux paramètres d\'entrée</p>',
    position: 'right',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('#bar_section'),
    intro: '<p class="titlestep">L\'espace central est consacré au graphique</p>',
    position: 'left',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('#map_section'),
    intro: '<p class="titlestep">L\'espace latéral droit est consacré à la carte</p>',
    position: 'left',
    disableInteraction: true,
  });

  // Left menu..
  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('.regio_name').parentElement,
    intro: `<p class="titlestep">Étape 1 : Choix du territoire</p>Un territoire de référence doit être choisi pour débuter les analyses de Regioviz (saisie avec autocomplétion ou choix dans un menu déroulant).
Seuls les territoires relevant du maillage territorial choisi (sélectionné dans la boite suivante) sont proposées`,
    position: 'right',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('#menu_territ_level'),
    intro: `<p class="titlestep">Étape 1 (suite) : choix d'un type d'unité territoriale</p>
Les territoires proposés à la sélection ainsi que les espaces d'études permettant de restreindre l'analyse à des territoires proches ou présentant des similarités dépendent de ce choix d'unité territoriales`,
    position: 'right',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('#menu_variables'),
    intro: '<p class="titlestep">Étape 2 : Choix d\'un ou de plusieurs indicateurs</p>Un indicateur doit être sélectionné au minimum. Il est possible de sélectionner jusqu\'à 7 indicateurs.',
    position: 'right',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('div#menu_studyzone'),
    intro: '<p class="titlestep">Étape 3 : Choix d\'un espace d\'étude</p>Par défaut, l\'ensemble de l\'espace d\'étude est considéré dans les analyses. Il est possible de restreindre cete espace d\'étude à des régions proches ou présentant des similarités.',
    position: 'right',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('.top_section.t2'),
    intro: '<p class="titlestep">Étape 4 : Choix d\'une fonctionnalité d\'analyse</p>Les fonctionnalités disponibles <i>(non-grisée)</i> correspondent au nombre de variables disponibles.',
    position: 'bottom',
    disableInteraction: true,
  });

  // Chart..
  tour.addStep({
    tooltipClass: 'steptour',
    element: elem_top_chart,
    intro: '<p class="titlestep">Les boutons localisés au dessus du graphique permettent d\'obtenir de l\'aide sur la fonctionnalité en cours ainsi que d\'exporter un rapport ou les données utilisées dans l\'application.</p>',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.getElementById('svg_bar'),
    intro: '<p class="titlestep">Le graphique...</p>',
    position: 'bottom',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.getElementById('menu_selection'),
    intro: '<p class="titlestep">Pour chaque graphique, un menu permet de modifier des paramètres ou par exemple d\'effectuer des séléctions prédéfinies</p>',
    position: 'bottom',
    disableInteraction: true,
  });

  // Map..
  tour.addStep({
    tooltipClass: 'steptour',
    element: elem_top_map,
    intro: '<p class="titlestep">Les boutons localisés au dessus de la carte permettent....</p>',
    position: 'bottom',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.getElementById('svg_map'),
    intro: '<p class="titlestep">La carte ....</p>',
    position: 'bottom',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.getElementById('svg_legend'),
    intro: '<p class="titlestep">La légende est adaptée à chaque type de graphique et aux couleurs qui en sont issues</p>',
    position: 'bottom',
    disableInteraction: true,
  });

  tour.addStep({
    tooltipClass: 'steptour',
    element: document.querySelector('.minitable_container'),
    intro: '<p class="titlestep">Un tableau ...</p>',
    position: 'bottom',
    disableInteraction: true,
  });

  // const refreshTour = () => {
  //   tour.refresh();
  // };

  // tour.onafterchange(() => {
  //   switch (tour._currentStep) {
  //     case 4:
  //       document.querySelector('.regio_name')
  //         .parentElement.addEventListener('click', refreshTour);
  //       break;
  //     case 5:
  //       document.querySelector('#menu_variables').addEventListener('click', refreshTour);
  //       break;
  //     default:
  //       break;
  //   }
  // });
  tour.onexit(() => {
    Array.prototype.slice.call(document.querySelectorAll('.temp_tour_overlay'))
      .forEach((elem) => {
        elem.remove();
      });
    // document.querySelector('.regio_name')
    //   .parentElement.removeEventListener('click', refreshTour);
    // document.querySelector('#menu_variables').removeEventListener('click', refreshTour);
  });

  return tour;
}
