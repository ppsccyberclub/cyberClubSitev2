  <section class="widget">
  <h3 class="widget-title">Upcoming Events</h3>
  
  {% if events.length > 0 %}
    <ul class="event-stack">
      {% for event in events %}
        <li class="event-card">
          <time class="event-time">{{ event.formattedDate }} • {{ event.formattedTime }}</time>
          <h4 class="event-name">{{ event.title }}</h4>
          {% if event.description %}
            <span class="event-description"><strong>Notes:</strong> {{ event.description }}</span>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p class="no-events">No upcoming events scheduled right now. Check back soon!</p>
  {% endif %}
  </section>
