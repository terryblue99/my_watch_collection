class Complication < ApplicationRecord
	has_many :complications_watches
    has_many :watches, through: :complications_watches

    validates :name, presence: true
    validates_uniqueness_of :name
    validates :description, presence: true

    def self.description(c_id)

    	self.find_by(id: c_id).description

    end	

end
