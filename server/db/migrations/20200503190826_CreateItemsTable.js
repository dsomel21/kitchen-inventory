const {
  addDefaultColumns,
  createOnlyNameColumnOnTable,
} = require('../../src/lib/tableUtils.js');

exports.up = async (knex) => {
  // Size   
  knex.schema.createTable('sizes', (t) => {
    t.increments().notNullable();
    t.string('name').notNullable();
    t.float('width_in_cm');
    t.float('length_in_cm');
    t.float('height_in_cm');

    t.integer(`shape_id`)
      .unsigned()
      .references(`shapes.id`)
      .onDelete('CASCADE');

    addDefaultColumns(t);
  });

  // Shape
  knex.schema.createTable('shapes', (t) => {
    t.increments().notNullable();
    createOnlyNameColumnOnTable(t);
  });

  // Item
  knex.schema.createTable('items', (t) => {
    t.increments().notNullable();

    addDefaultColumns(t);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('sizes');
  await knex.schema.dropTable('items');
};




def get_five_stage_plants 
  five_stage_plants = []
  Plant.where(approved: true).each do |plant|  
    if plant.optimal_conditions.where(active: true).count == 5
      five_stage_plants << plant
    end
  end
  return five_stage_plants
end

def get_six_stage_plants 
  six_stage_plants = []
  Plant.where(approved: true).each do |plant|  
    if plant.optimal_conditions.where(active: true).count == 6
      six_stage_plants << plant
    end
  end
  return six_stage_plants
end


def change_oc_calmag_5_stages(stage_num, val)
  new_results = []
  get_five_stage_plants.each do |plant|

    oc = plant.optimal_conditions.where(active: true).find_by_stage_number(stage_num) 
    if oc && oc.calmag_absolute.nil?
      new_results << [oc.id, plant.name, oc.plant.optimal_conditions.count, oc.stage_number, [oc.calmag_absolute, val]]
      oc.calmag_absolute = val
      oc.save
    end
  end 
  return new_results
end 


def change_oc_calmag_6_stages(stage_num, val)
  new_results = []
  get_six_stage_plants.each do |plant|
    oc = plant.optimal_conditions.active.find_by_stage_number(stage_num) 
    if oc && oc.calmag_absolute.nil?
      new_results << [oc.id, plant.name, oc.plant.optimal_conditions.count, oc.stage_number, [oc.calmag_absolute, val]]
      oc.calmag_absolute = val
      oc.save
    end
  end 
  return new_results
end 



def get_active_schedules 
  active_schedules = []
  UnitPlant.where(active: true).each do |up|
    active_schedules << up.schedules.last
  end
  return active_schedules
end


def update_null_calmags
  new_results = []
  get_active_schedules.each do  |schedule|
    schedule.stages.active.each do |stage|
      if stage.calmag_absolute.nil? 
        new_results << [
          stage.id,
          schedule.unit_plant.plant.name,
          stage.stage_number,
          schedule.stages.where(active: true).count,
          stage.calmag_absolute,
          schedule.unit_plant.plant.optimal_conditions.active.find_by_stage_number(stage.stage_number).calmag_absolute
        ]
      end
    end
  end
  return new_results
end