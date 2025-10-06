<script>
const form = document.getElementById('listingForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // form submit temporarily rok do

  const location = document.getElementById('location').value;
  if (!location) return alert("Enter location");

  // Nominatim API call
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
  const data = await res.json();

  if (data.length === 0) return alert("Location not found");

  // Set lat/lon in hidden inputs
  document.getElementById('lat').value = parseFloat(data[0].lat);
  document.getElementById('lon').value = parseFloat(data[0].lon);

  // Now submit form
  form.submit();
});
</script>
