class Weeks {
	data() {
		return {
			eleventyNavigation: {
				key: "Life in weeks",
				order: 5,
				parent: "Chronological",
			},
			layout: "chronological",
			permalink: "weeks/",
			title: "Life in weeks",
		}
	}

	render(data) {
		const birthDate = new Date("2001-08-16");
		const today = new Date();
		const deathDate = new Date("2081-08-16");
		const weeksAlive = Math.floor((deathDate - birthDate) / (7 * 24 * 60 * 60 * 1000));
		
		// Group weeks into decades (520 weeks per decade)
		const decades = Array.from({ length: Math.ceil(weeksAlive / 520) }, (_, decadeIndex) => {
			const decadeStart = decadeIndex * 520;
			const decadeEnd = Math.min(decadeStart + 520, weeksAlive);
			
			const decadeWeeks = Array.from({ length: decadeEnd - decadeStart }, (_, index) => {
				const weekIndex = decadeStart + index;
				const weekStart = new Date(birthDate);
				weekStart.setDate(birthDate.getDate() + (weekIndex * 7));
				
				const weekEnd = new Date(weekStart);
				weekEnd.setDate(weekStart.getDate() + 6);
				
				// Check each day of the week
				const eventsThisWeek = [];
				const currentDay = new Date(weekStart);
				
				while (currentDay <= weekEnd) {
					const dateString = currentDay.toISOString().split("T")[0];
					const specialDate = data.weeks[dateString];

					if (specialDate) {
						eventsThisWeek.push({ date: dateString, ...specialDate });
					}

					if (dateString === today.toISOString().split("T")[0]) {
						eventsThisWeek.push({ date: dateString, headline: "Today" });
					}

					if (dateString.slice(4) === birthDate.toISOString().split("T")[0].slice(4) && 
						currentDay.getFullYear() !== birthDate.getFullYear()) {
						eventsThisWeek.push({
							headline: `${currentDay.getFullYear() - birthDate.getFullYear()} in ${currentDay.getFullYear()}`,
						});
					}

					currentDay.setDate(currentDay.getDate() + 1);
				}

				const events = eventsThisWeek.map((event) => {
					return event.description
						? `<details class="[ event ]">
								<summary>
									${event.headline}<br>
									<small><time datetime="${event.date}">${this.dateToLocale(new Date(event.date))}</time></small>
								</summary>
								${event.based ? `<p><small>📍 ${event.based}</small></p>` : ''}
								<p>${event.description}</p>
							</details>`
						: `<div class="[ event ]">
								<p><strong>${event.headline}</strong></p>
								<p><small><time datetime="${event.date}">${this.dateToLocale(new Date(event.date))}</time></small></p>
							</div>`;
				}).join('');

				return `<li>
					${events}
				</li>`;
			}).join('');

			const decadeStartYear = new Date(birthDate.getTime() + (decadeStart * 7 * 24 * 60 * 60 * 1000)).getFullYear();
			return `<section class="[ decade ]">
				<h2>${decadeIndex === 0 ? "My first ten years" : decadeIndex === 1 ? "My teens" : `My ${decadeIndex}0s`} <small>(${decadeStartYear}–${decadeStartYear + 10})</small></h2>
				<ol class="[ weeks ]">${decadeWeeks}</ol>
			</section>`;
		}).join('');

		return `<div class="[ decades ]">${decades}</div>`;
	}
}

export default Weeks;
