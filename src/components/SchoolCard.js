export default function SchoolCard({ school }) {
  return (
    <div className="school-card">
      {school.image && (
        <img src={school.image} alt={school.name} />
      )}
      <h2>{school.name}</h2>
      <p>{school.address}, {school.city}, {school.state}</p>
      <p><strong>Contact:</strong> {school.contact}</p>
      <p><strong>Email:</strong> {school.email}</p>
    </div>
  );
}
