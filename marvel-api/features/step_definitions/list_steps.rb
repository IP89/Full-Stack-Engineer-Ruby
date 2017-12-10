When("I go to /list") do
  get('/list')
end

Then("I should get the first {int} comics") do |int|
  data = MultiJson.load(last_response.body)
  expect(data.length).to be(int)
end


When("I go to /list with page {int} as argument") do |int|
  call = "/list?page=#{int}"
  get(call)
end

Then("I should get {int} comics") do |int|
  data = MultiJson.load(last_response.body)
  expect(data.length).to be(int)
end
