export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "oie" }), {
    status: 200,
  });
}
