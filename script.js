// Simulação de dados de voos (normalmente viria de API/backend)
const flights = [
  {
    id: 1,
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    departureDate: "2025-10-01",
    returnDate: null,
    price: 300,
    airline: "Gol",
    directFlight: true,
    durationHours: 1,
    baggageIncluded: true,
    mealService: false,
    wifiAvailable: false,
    seatSelection: true,
    cancelPolicy: "flexível",
    frequentDelays: false,
    milesAvailable: true
  },
  {
    id: 2,
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    departureDate: "2025-10-01",
    returnDate: null,
    price: 280,
    airline: "Latam",
    directFlight: false,
    durationHours: 2.5,
    baggageIncluded: false,
    mealService: true,
    wifiAvailable: true,
    seatSelection: true,
    cancelPolicy: "não flexível",
    frequentDelays: true,
    milesAvailable: true
  },
  {
    id: 3,
    origin: "São Paulo",
    destination: "Belo Horizonte",
    departureDate: "2025-10-05",
    returnDate: null,
    price: 350,
    airline: "Azul",
    directFlight: true,
    durationHours: 1.2,
    baggageIncluded: true,
    mealService: false,
    wifiAvailable: true,
    seatSelection: false,
    cancelPolicy: "flexível",
    frequentDelays: false,
    milesAvailable: false
  },
  {
    id: 4,
    origin: "Rio de Janeiro",
    destination: "Miami",
    departureDate: "2025-11-10",
    returnDate: "2025-11-20",
    price: 2500,
    airline: "American Airlines",
    directFlight: true,
    durationHours: 8,
    baggageIncluded: true,
    mealService: true,
    wifiAvailable: true,
    seatSelection: true,
    cancelPolicy: "flexível",
    frequentDelays: false,
    milesAvailable: true
  },
  {
    id: 5,
    origin: "São Paulo",
    destination: "Miami",
    departureDate: "2025-11-10",
    returnDate: "2025-11-20",
    price: 2300,
    airline: "Delta",
    directFlight: false,
    durationHours: 10,
    baggageIncluded: true,
    mealService: true,
    wifiAvailable: false,
    seatSelection: true,
    cancelPolicy: "não flexível",
    frequentDelays: true,
    milesAvailable: true
  }
];

// Referências dos inputs
const filters = {
  origin: document.getElementById('origin'),
  destination: document.getElementById('destination'),
  departureDate: document.getElementById('departureDate'),
  returnDate: document.getElementById('returnDate'),
  priceMax: document.getElementById('priceMax'),
  airline: document.getElementById('airline'),
  directFlight: document.getElementById('directFlight'),
  maxDuration: document.getElementById('maxDuration'),
  baggageIncluded: document.getElementById('baggageIncluded'),
  mealService: document.getElementById('mealService'),
  wifiAvailable: document.getElementById('wifiAvailable'),
  seatSelection: document.getElementById('seatSelection'),
  cancelPolicy: document.getElementById('cancelPolicy'),
  frequentDelays: document.getElementById('frequentDelays'),
  milesAvailable: document.getElementById('milesAvailable'),
};

const resultsContainer = document.getElementById('resultsContainer');

function filterFlights() {
  let filtered = flights.filter(flight => {
    // Origem (case insensitive)
    if (filters.origin.value && !flight.origin.toLowerCase().includes(filters.origin.value.toLowerCase())) return false;
    // Destino
    if (filters.destination.value && !flight.destination.toLowerCase().includes(filters.destination.value.toLowerCase())) return false;
    // Data de partida (igual ou posterior)
    if (filters.departureDate.value && flight.departureDate < filters.departureDate.value) return false;
    // Data retorno (igual ou anterior) - se especificado
    if (filters.returnDate.value && flight.returnDate && flight.returnDate > filters.returnDate.value) return false;
    // Preço máximo
    if (filters.priceMax.value && flight.price > Number(filters.priceMax.value)) return false;
    // Companhia aérea
    if (filters.airline.value && flight.airline !== filters.airline.value) return false;
    // Voo direto
    if (filters.directFlight.value) {
      if (filters.directFlight.value === 'yes' && !flight.directFlight) return false;
      if (filters.directFlight.value === 'no' && flight.directFlight) return false;
    }
    // Duração máxima
    if (filters.maxDuration.value && flight.durationHours > Number(filters.maxDuration.value)) return false;
    // Bagagem incluída
    if (filters.baggageIncluded.value) {
      if (filters.baggageIncluded.value === 'yes' && !flight.baggageIncluded) return false;
      if (filters.baggageIncluded.value === 'no' && flight.baggageIncluded) return false;
    }
    // Serviço de refeição
    if (filters.mealService.value) {
      if (filters.mealService.value === 'yes' && !flight.mealService) return false;
      if (filters.mealService.value === 'no' && flight.mealService) return false;
    }
    // Wi-Fi
    if (filters.wifiAvailable.value) {
      if (filters.wifiAvailable.value === 'yes' && !flight.wifiAvailable) return false;
      if (filters.wifiAvailable.value === 'no' && flight.wifiAvailable) return false;
    }
    // Seleção de assento
    if (filters.seatSelection.value) {
      if (filters.seatSelection.value === 'yes' && !flight.seatSelection) return false;
      if (filters.seatSelection.value === 'no' && flight.seatSelection) return false;
    }
    // Política de cancelamento
    if (filters.cancelPolicy.value) {
      if (filters.cancelPolicy.value === 'yes' && flight.cancelPolicy !== 'flexível') return false;
      if (filters.cancelPolicy.value === 'no' && flight.cancelPolicy === 'flexível') return false;
    }
    // Atrasos frequentes
    if (filters.frequentDelays.value) {
      if (filters.frequentDelays.value === 'yes' && !flight.frequentDelays) return false;
      if (filters.frequentDelays.value === 'no' && flight.frequentDelays) return false;
    }
    // Acumula milhas
    if (filters.milesAvailable.value) {
      if (filters.milesAvailable.value === 'yes' && !flight.milesAvailable) return false;
      if (filters.milesAvailable.value === 'no' && flight.milesAvailable) return false;
    }

    return true;
  });

  displayResults(filtered);
}

function displayResults(flightsArray) {
  resultsContainer.innerHTML = "";
  if (flightsArray.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">Nenhum voo encontrado com os filtros aplicados.</p>';
    return;
  }

  flightsArray.forEach(flight => {
    const flightDiv = document.createElement('div');
    flightDiv.classList.add('flight-card');
    flightDiv.innerHTML = `
      <div class="flight-title">${flight.origin} → ${flight.destination}</div>
      <div>Data de partida: <span class="flight-detail">${flight.departureDate}</span></div>
      <div>Data de retorno: <span class="flight-detail">${flight.returnDate || 'Não aplicável'}</span></div>
      <div>Preço: <span class="flight-detail">R$ ${flight.price.toFixed(2)}</span></div>
      <div>Companhia: <span class="flight-detail">${flight.airline}</span></div>
      <div>Voo direto: <span class="flight-detail">${flight.directFlight ? 'Sim' : 'Não'}</span></div>
      <div>Duração: <span class="flight-detail">${flight.durationHours} horas</span></div>
      <div>Bagagem incluída: <span class="flight-detail">${flight.baggageIncluded ? 'Sim' : 'Não'}</span></div>
      <div>Refeição: <span class="flight-detail">${flight.mealService ? 'Sim' : 'Não'}</span></div>
      <div>Wi-Fi a bordo: <span class="flight-detail">${flight.wifiAvailable ? 'Sim' : 'Não'}</span></div>
      <div>Seleção de assento: <span class="flight-detail">${flight.seatSelection ? 'Sim' : 'Não'}</span></div>
      <div>Política cancelamento: <span class="flight-detail">${flight.cancelPolicy}</span></div>
      <div>Atrasos frequentes: <span class="flight-detail">${flight.frequentDelays ? 'Sim' : 'Não'}</span></div>
      <div>Acumula milhas: <span class="flight-detail">${flight.milesAvailable ? 'Sim' : 'Não'}</span></div>
    `;
    resultsContainer.appendChild(flightDiv);
  });
}

// Adiciona listeners para atualizar ao digitar ou mudar seleção
Object.values(filters).forEach(input => {
  input.addEventListener('input', filterFlights);
  input.addEventListener('change', filterFlights);
});

// Mostrar todos ao carregar a página
filterFlights();
