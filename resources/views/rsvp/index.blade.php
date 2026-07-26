<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>RSVP List | Amjad & Amal</title>

    <link
        rel="stylesheet"
        href="{{ asset('wedding/css/rsvp-admin.css') }}"
    >
</head>

<body>
<main class="admin-page">
    <div class="admin-container">

        {{-- Header --}}
        <header class="admin-header">
            <div>
                <p class="admin-eyebrow">Amjad & Amal</p>

                <h1>Wedding RSVP List</h1>

                <p class="admin-subtitle">
                    View and manage all submitted wedding responses.
                </p>
            </div>

            <a
                href="{{ route('wedding') }}"
                class="button button--outline"
                target="_blank"
                rel="noopener"
            >
                Open Wedding Website
            </a>
        </header>

        {{-- Statistics --}}
        <section class="statistics-grid">
            <article class="stat-card">
                    <span class="stat-card__label">
                        Total Submissions
                    </span>

                <strong class="stat-card__value">
                    {{ number_format($statistics['submissions']) }}
                </strong>
            </article>

            <article class="stat-card stat-card--success">
                    <span class="stat-card__label">
                        Attending Responses
                    </span>

                <strong class="stat-card__value">
                    {{ number_format($statistics['attending_submissions']) }}
                </strong>
            </article>

            <article class="stat-card stat-card--declined">
                    <span class="stat-card__label">
                        Declined Responses
                    </span>

                <strong class="stat-card__value">
                    {{ number_format($statistics['declined_submissions']) }}
                </strong>
            </article>

            <article class="stat-card stat-card--guests">
                    <span class="stat-card__label">
                        Total Attending Guests
                    </span>

                <strong class="stat-card__value">
                    {{ number_format($statistics['attending_guests']) }}
                </strong>
            </article>
        </section>

        {{-- Search and filters --}}
        <section class="filter-panel">
            <form
                action="{{ route('wedding.rsvp.index') }}"
                method="GET"
                class="filter-form"
            >
                <div class="filter-field filter-field--search">
                    <label for="search">
                        Search
                    </label>

                    <input
                        id="search"
                        name="search"
                        type="search"
                        value="{{ $search }}"
                        placeholder="Search by name or phone"
                    >
                </div>

                <div class="filter-field">
                    <label for="attendance">
                        Attendance
                    </label>

                    <select
                        id="attendance"
                        name="attendance"
                    >
                        <option value="">
                            All responses
                        </option>

                        <option
                            value="yes"
                            @selected($attendance === 'yes')
                        >
                            Attending
                        </option>

                        <option
                            value="no"
                            @selected($attendance === 'no')
                        >
                            Declined
                        </option>
                    </select>
                </div>

                <div class="filter-actions">
                    <button
                        type="submit"
                        class="button button--primary"
                    >
                        Apply Filters
                    </button>

                    @if ($search !== '' || $attendance)
                        <a
                            href="{{ route('wedding.rsvp.index') }}"
                            class="button button--clear"
                        >
                            Clear
                        </a>
                    @endif
                </div>
            </form>
        </section>

        {{-- Table --}}
        <section class="table-panel">
            <div class="table-panel__header">
                <div>
                    <h2>Responses</h2>

                    <p>
                        @if ($weddingRsvps->total() > 0)
                            Showing
                            {{ $weddingRsvps->firstItem() }}
                            to
                            {{ $weddingRsvps->lastItem() }}
                            of
                            {{ $weddingRsvps->total() }}
                            responses
                        @else
                            No responses found
                        @endif
                    </p>
                </div>
            </div>

            <div class="table-wrapper">
                <table class="rsvp-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Guest</th>
                        <th>Phone</th>
                        <th>Attendance</th>
                        <th>Guests</th>
                        <th>Message</th>
                        <th>Submitted</th>
                        <th>Card</th>
                    </tr>
                    </thead>

                    <tbody>
                    @forelse ($weddingRsvps as $weddingRsvp)
                        <tr>
                            <td data-label="#">
                                {{ $weddingRsvps->firstItem() + $loop->index }}
                            </td>

                            <td data-label="Guest">
                                <div class="guest-name">
                                    {{ $weddingRsvp->name }}
                                </div>
                            </td>

                            <td data-label="Phone">
                                @if ($weddingRsvp->phone)
                                    <a
                                        href="tel:{{ preg_replace('/[^0-9+]/', '', $weddingRsvp->phone) }}"
                                        class="phone-link"
                                    >
                                        {{ $weddingRsvp->phone }}
                                    </a>
                                @else
                                    <span class="empty-value">
                                                Not provided
                                            </span>
                                @endif
                            </td>

                            <td data-label="Attendance">
                                @if ($weddingRsvp->attendance === 'yes')
                                    <span class="status status--accepted">
                                                Attending
                                            </span>
                                @else
                                    <span class="status status--declined">
                                                Declined
                                            </span>
                                @endif
                            </td>

                            <td data-label="Guests">
                                @if ($weddingRsvp->attendance === 'yes')
                                    <span class="guest-count">
                                                {{ $weddingRsvp->guests }}
                                            </span>
                                @else
                                    <span class="empty-value">
                                                —
                                            </span>
                                @endif
                            </td>

                            <td data-label="Message">
                                @if ($weddingRsvp->message)
                                    <div
                                        class="guest-message"
                                        title="{{ $weddingRsvp->message }}"
                                    >
                                        {{ $weddingRsvp->message }}
                                    </div>
                                @else
                                    <span class="empty-value">
                                                No message
                                            </span>
                                @endif
                            </td>

                            <td data-label="Submitted">
                                <div class="submitted-date">
                                    <strong>
                                        {{ $weddingRsvp->created_at->format('M d, Y') }}
                                    </strong>

                                    <span>
                                                {{ $weddingRsvp->created_at->format('h:i A') }}
                                            </span>
                                </div>
                            </td>

                            <td data-label="Card">
                                <a
                                    href="{{ route('wedding.rsvp.thank-you', $weddingRsvp) }}"
                                    class="view-card-link"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    View Card
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td
                                colspan="8"
                                class="empty-table"
                            >
                                <div class="empty-table__icon">
                                    ♡
                                </div>

                                <h3>No RSVP responses found</h3>

                                <p>
                                    No submissions match the current filters.
                                </p>

                                @if ($search !== '' || $attendance)
                                    <a
                                        href="{{ route('wedding.rsvp.index') }}"
                                        class="button button--outline"
                                    >
                                        Clear Filters
                                    </a>
                                @endif
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>

            {{-- Custom pagination --}}
            @if ($weddingRsvps->hasPages())
                @php
                    $currentPage = $weddingRsvps->currentPage();
                    $lastPage = $weddingRsvps->lastPage();
                    $startPage = max(1, $currentPage - 2);
                    $endPage = min($lastPage, $currentPage + 2);
                @endphp

                <nav
                    class="pagination"
                    aria-label="RSVP pagination"
                >
                    @if ($weddingRsvps->onFirstPage())
                        <span class="pagination__button is-disabled">
                                Previous
                            </span>
                    @else
                        <a
                            href="{{ $weddingRsvps->previousPageUrl() }}"
                            class="pagination__button"
                        >
                            Previous
                        </a>
                    @endif

                    <div class="pagination__pages">
                        @if ($startPage > 1)
                            <a
                                href="{{ $weddingRsvps->url(1) }}"
                                class="pagination__page"
                            >
                                1
                            </a>

                            @if ($startPage > 2)
                                <span class="pagination__dots">
                                        …
                                    </span>
                            @endif
                        @endif

                        @for ($page = $startPage; $page <= $endPage; $page++)
                            @if ($page === $currentPage)
                                <span
                                    class="pagination__page is-active"
                                    aria-current="page"
                                >
                                        {{ $page }}
                                    </span>
                            @else
                                <a
                                    href="{{ $weddingRsvps->url($page) }}"
                                    class="pagination__page"
                                >
                                    {{ $page }}
                                </a>
                            @endif
                        @endfor

                        @if ($endPage < $lastPage)
                            @if ($endPage < $lastPage - 1)
                                <span class="pagination__dots">
                                        …
                                    </span>
                            @endif

                            <a
                                href="{{ $weddingRsvps->url($lastPage) }}"
                                class="pagination__page"
                            >
                                {{ $lastPage }}
                            </a>
                        @endif
                    </div>

                    @if ($weddingRsvps->hasMorePages())
                        <a
                            href="{{ $weddingRsvps->nextPageUrl() }}"
                            class="pagination__button"
                        >
                            Next
                        </a>
                    @else
                        <span class="pagination__button is-disabled">
                                Next
                            </span>
                    @endif
                </nav>
            @endif
        </section>
    </div>
</main>
</body>
</html>
