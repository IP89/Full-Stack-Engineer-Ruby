module MarvelHelper
  def self.get_marvel_client
    Marvelite::API::Client.new( :public_key => MARVEL_PUBLIC_KEY, :private_key => MARVEL_PRIVATE_KEY)
  end

  def self.fetch_all_comics
    client = self.get_marvel_client
    comics = []
    offset = 0

    last_fetch = self.fetch_comics_by_offset(client, offset)
    comics = comics.concat(last_fetch)

    while(last_fetch.count == 100 && comics.length < 4000)
      offset += 100
      last_fetch = self.fetch_comics_by_offset(client, offset)
      comics = comics.concat(last_fetch)
    end

    comics
  end

  def self.fetch_comics_since_date(date)
    client = self.get_marvel_client
    comics = []
    offset = 0

    current_date = Time.now.strftime("%Y-%m-%d")

    last_fetch = self.fetch_comics_by_offset(client, offset, [date, current_date])
    comics = comics.concat(last_fetch)

    while(last_fetch.count == 100)
      offset += 100
      last_fetch = self.fetch_comics_by_offset(client, offset, [date, current_date])
      comics = comics.concat(last_fetch)
    end

    comics
  end

  def self.fetch_comics_by_offset(client, offset, date_range=nil)
    params = {
      format: 'comic',
      offset: offset,
      limit: 100,
      orderBy: "-onsaleDate"
    }

    if date_range
      params[:dateRange] = "#{date_range[0]}, #{date_range[1]}"
    end

    result = client.comics(params)
    result[:data][:results]
  end
end