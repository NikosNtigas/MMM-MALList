Module.register("MMM-MALList",
	{
		animeList: null,
		mangaList: null,
		defaults: {
			position: "top_right",
			refreshInterval: 0,
			updateInterval: 60000,
			username: "AlchemistKng",
			showAnimeList: true,
			numOfAnime: Infinity,
			showMangaList: true,
			numOfManga: Infinity,
			showTitle: true,
			showType: true,
			showProgress: true,
		},

		start: function () {
			this.getJson()
			this.scheduleUpdate()
		},

		scheduleUpdate: function () {
			var self = this
			setInterval(
				function () {
					self.getJson()
				},
				this.config.updateInterval
			)
		},

		getJson: function () {
			this.sendSocketNotification("DATA_GET", {username: this.config.username})
		},

		socketNotificationReceived: function (notification, payload) {
			if (notification === "DATA_RESULT") {
				this.animeList = []
				this.animeList = payload.data.anime
				this.mangaList = []
				this.mangaList = payload.data.manga
				this.updateDom(500)
			}
		},

		getHeader: function () {
			if (this.config.showAnimeList === true && this.config.mangaList === true)
				return this.config.username + ' currently watching/reading'
			if (this.config.showAnimeList === true)
				return this.config.username + ' currently watching'
			if (this.config.showMangaList === true)
				return this.config.username + ' currently reading'
		},

		getStyles: function () {
			return ['MMM-MALList.css']
		},

		getDom: function () {
			function createTitle(title) {
				td = document.createElement("td")
				td.className = "anime-title"
				td.textContent = title
				return td
			}

			function createType(type) {
				td = document.createElement("td")
				td.className = "anime-type"
				td.textContent = type
				return td
			}

			function createProgress(watched, total) {
				td = document.createElement("td")
				td.className = "anime-progress"
				td.textContent = watched + "/" + ((total !== 0) ? total : "-")
				return td
			}

			var wrapper = document.createElement("div")
			wrapper.classList.add(this.config.position)
			wrapper.style.width = this.config.width
			if (this.animeList === null || this.mangaList === null) {
				wrapper.innerHTML = "Waiting for data..."
				this.getJson()
				return wrapper
			}
			var table = document.createElement("table")
			{
				var tr = document.createElement("tr")
				if (this.config.showTitle) {
					var th = document.createElement("th")
					th.className = "anime-title"
					th.textContent = "Title"
					tr.appendChild(th)
				}
				if (this.config.showType) {
					var th = document.createElement("th")
					th.className = "anime-type"
					th.textContent = "Type"
					tr.appendChild(th)
				}
				if (this.config.showProgress) {
					var th = document.createElement("th")
					th.className = "anime-progress"
					th.textContent = "Progress"
					tr.appendChild(th)
				}
				table.appendChild(tr)
			}
			for (let i = 0; i < this.animeList.length && i < this.config.numOfAnime && this.config.showAnimeList; i++) {
				const anime = this.animeList[i]
				tr = document.createElement("tr")
				if (this.config.showTitle) tr.appendChild(createTitle(anime["title"]))
				if (this.config.showType) tr.appendChild(createType(anime["type"]))
				if (this.config.showProgress) tr.appendChild(createProgress(anime["watched_episodes"], anime["total_episodes"]))
				table.appendChild(tr)
			}
			for (let i = 0; i < this.mangaList.length && i < this.config.numOfManga && this.config.showMangaList; i++) {
				const manga = this.mangaList[i]
				tr = document.createElement("tr")
				if (this.config.showTitle) tr.appendChild(createTitle(manga["title"]))
				if (this.config.showType) tr.appendChild(createType(manga["type"]))
				if (this.config.showProgress) tr.appendChild(createProgress(manga["read_chapters"], manga["total_chapters"]))
				table.appendChild(tr)
			}
			table.appendChild(tr)
			wrapper.appendChild(table)
			return wrapper
		},
	}
)
