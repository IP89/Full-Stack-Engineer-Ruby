module CharacterHelper

  def self.buildCharacter(params)
    character = Character.new
    character.uri = params[:resourceURI]
    character.name = params[:name]
    character.save
    character
  end
end