import React from "react";
import { Link } from "react-router-dom";

import "../components/styles/BadgesList.css";

import Gravatar from "./Gravatar";

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBadges, setFilteredResults] = React.useState(badges);

  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredResults(result);
  }, [badges, query]);
  return { query, setQuery, filteredBadges }
}

function BadgesList(props) {
  const badges = props.badges;
  const {query, setQuery, filteredBadges } = useSearchBadges(badges);
  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>No badges were found</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create new badge
        </Link>
      </div>
    );
  }
  return (
    <ul className="list-unstyled">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      {filteredBadges.map((badge) => {
        return (
          <li key={badge.id}>
            <Link
              className="text-reset text-decoration-none"
              to={`/badges/${badge.id}`}
            >
              <p className="BadgesListItem">
                <Gravatar
                  className="BadgesListItem__avatar"
                  email={badge.email}
                  alt=""
                />
                {badge.firstName}
                {badge.lastName}
                {badge.twitter}
                {badge.jobTitle}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default BadgesList;
