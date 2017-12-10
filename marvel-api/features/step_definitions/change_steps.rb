When("I go to /comic with marvel_id {int}") do |int|
  get("/comic?marvel_id=#{int}")
end

Then("the favorite should be false") do
  data = MultiJson.load(last_response.body)
  expect(data['favorite']).to be(false)
end

When("I go to /comic_modify with marvel_id {int}") do |int|
  post("/comic_modify?marvel_id=#{int}&favorite=true")
end

Then("the favorite should be true") do
  data = MultiJson.load(last_response.body)
  expect(data['favorite']).to be(true)
end