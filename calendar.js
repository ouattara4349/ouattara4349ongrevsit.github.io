// Calendrier interactif pour les événements
class EventCalendar {
    constructor() {
        this.currentDate = new Date();
        this.events = [
            {
                date: '2025-12-15',
                title: 'Journée de l\'espoir',
                type: 'main',
                description: 'Grande journée de célébration et de partage'
            },
            {
                date: '2025-12-22',
                title: 'Formation bénévoles',
                type: 'formation',
                description: 'Formation des nouveaux bénévoles'
            },
            {
                date: '2025-12-28',
                title: 'Collecte de dons',
                type: 'regular',
                description: 'Collecte de dons en nature'
            },
            {
                date: '2025-01-05',
                title: 'Atelier créatif',
                type: 'regular',
                description: 'Atelier créatif pour enfants'
            },
            {
                date: '2025-01-15',
                title: 'Réunion équipe',
                type: 'regular',
                description: 'Réunion mensuelle de l\'équipe'
            },
            {
                date: '2025-01-25',
                title: 'Formation santé',
                type: 'formation',
                description: 'Formation en premiers soins'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderCalendar();
        this.bindEvents();
        this.showEventsForCurrentMonth();
    }
    
    renderCalendar() {
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        
        // Mettre à jour le titre du mois
        document.getElementById('current-month').textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        const calendarDays = document.getElementById('calendar-days');
        calendarDays.innerHTML = '';
        
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay() + 1);
        
        const today = new Date();
        
        // Générer les jours du calendrier
        for (let i = 0; i < 42; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Vérifier si le jour est dans le mois actuel
            if (currentDay.getMonth() === this.currentDate.getMonth()) {
                dayElement.classList.add('current-month');
                
                // Vérifier si c'est aujourd'hui
                if (currentDay.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                // Vérifier s'il y a des événements ce jour
                const eventsForDay = this.getEventsForDate(currentDay);
                if (eventsForDay.length > 0) {
                    dayElement.classList.add('has-events');
                    dayElement.classList.add(`event-${eventsForDay[0].type}`);
                    
                    // Ajouter un indicateur d'événement
                    const eventIndicator = document.createElement('div');
                    eventIndicator.className = 'event-indicator';
                    eventIndicator.innerHTML = `<span>${eventsForDay.length}</span>`;
                    dayElement.appendChild(eventIndicator);
                }
            } else {
                dayElement.classList.add('other-month');
            }
            
            dayElement.textContent = currentDay.getDate();
            dayElement.setAttribute('data-date', currentDay.toISOString().split('T')[0]);
            
            // Ajouter un gestionnaire d'événements pour afficher les détails
            dayElement.addEventListener('click', () => {
                this.showDayDetails(currentDay);
            });
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    getEventsForDate(date) {
        const dateString = date.toISOString().split('T')[0];
        return this.events.filter(event => event.date === dateString);
    }
    
    showDayDetails(date) {
        const events = this.getEventsForDate(date);
        const dateString = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let modalContent = `
            <div class="calendar-modal">
                <div class="modal-header">
                    <h3>${dateString}</h3>
                    <button class="modal-close" onclick="this.closest('.calendar-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
        `;
        
        if (events.length === 0) {
            modalContent += `
                <p class="no-events">Aucun événement prévu pour cette date.</p>
            `;
        } else {
            events.forEach(event => {
                modalContent += `
                    <div class="event-item event-${event.type}">
                        <h4>${event.title}</h4>
                        <p>${event.description}</p>
                        <div class="event-actions">
                            <button class="btn btn-primary btn-small">S'inscrire</button>
                            <button class="btn btn-outline btn-small">En savoir plus</button>
                        </div>
                    </div>
                `;
            });
        }
        
        modalContent += `
                </div>
            </div>
        `;
        
        // Créer et afficher la modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Fermer la modal en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    showEventsForCurrentMonth() {
        const currentMonthEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === this.currentDate.getMonth() &&
                   eventDate.getFullYear() === this.currentDate.getFullYear();
        });
        
        // Mettre à jour la liste des événements du mois si elle existe
        const monthEventsList = document.getElementById('month-events-list');
        if (monthEventsList) {
            monthEventsList.innerHTML = '';
            
            if (currentMonthEvents.length === 0) {
                monthEventsList.innerHTML = '<p>Aucun événement prévu ce mois-ci.</p>';
            } else {
                currentMonthEvents.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = `month-event-item event-${event.type}`;
                    eventElement.innerHTML = `
                        <div class="event-date">${new Date(event.date).getDate()}</div>
                        <div class="event-info">
                            <h4>${event.title}</h4>
                            <p>${event.description}</p>
                        </div>
                    `;
                    monthEventsList.appendChild(eventElement);
                });
            }
        }
    }
    
    bindEvents() {
        // Navigation du calendrier
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
            this.showEventsForCurrentMonth();
        });
        
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
            this.showEventsForCurrentMonth();
        });
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
                this.showEventsForCurrentMonth();
            } else if (e.key === 'ArrowRight') {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
                this.showEventsForCurrentMonth();
            }
        });
    }
}

// Initialiser le calendrier quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calendar-days')) {
        new EventCalendar();
    }
}); 