# Changelog

All notable changes to this project will be documented in this file.

The format follows Keep a Changelog and Semantic Versioning.

---

## [0.4.0] - 2026-07-27

### Added
- Added dynamic comparison panels that can display any number of countries.
- Added "Add Comparison Slot" functionality.
- Added the ability to remove individual comparison panels.
- Extended recent searches to work with the new comparison workflow.
- Automatically fills the first available comparison slot when selecting a recent search.

### Changed
- Refactored application state from a single-country model to an array-based comparison architecture.
- Reworked rendering logic to dynamically generate comparison panels.
- Improved component reusability by making country panels independent of one another.
- Simplified future feature development by adopting a scalable state structure.

### Fixed
- Fixed state synchronization across multiple comparison panels.
- Improved recent search behavior when comparison slots are full.
- Improved overall application stability after extensive stress testing.

---

## [0.3.0] - 2026-07-22

### Added
- Added Recent Searches feature to keep track of previously searched countries.
- Persisted recent searches using browser localStorage.
- Restored recent searches automatically on application startup.
- Limited recent searches history to the five most recent unique countries.
- Added clickable recent search items to quickly re-fetch and display country information.
- Added delete button for removing individual entries from recent searches.

### Changed
- Refactored country fetching logic into a reusable service function.
- Improved search workflow by reusing the same fetch logic for both manual searches and recent search selections.
- Prevented duplicate entries by moving existing searches to the top of the recent history.

### Fixed
- Fixed stale state issues while synchronizing recent searches with localStorage.
- Fixed React event handling issues when passing parameters to click handlers.
- Improved rendering by assigning stable keys to recent search list items.

---

## [0.2.0] - 2026-07-21

### Added
- Reusable `Button1` component
- `CountryCard` component
- `Loading` component
- Responsive country information layout
- Accessible form label and image alt text

### Changed
- Refactored the application into reusable React components
- Simplified `App.jsx` by separating UI into dedicated components
- Improved overall project structure and maintainability
- Enhanced responsive layout for smaller screens
- Reused button styles through a shared component

### Fixed
- Minor UI and accessibility improvements

---

## [0.1.0] - 2026-07-20

### Added

- Initial React + Vite project
- Tailwind CSS setup
- Country search interface
- REST Countries API integration
- Async API requests
- Loading state
- Error handling
- Country information display:
  - Name
  - Population
  - Capital
  - Currency

### Changed

- Migrated from mock JSON data to live REST API.

