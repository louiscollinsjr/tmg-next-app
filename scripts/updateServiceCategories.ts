
    console.log('Service categories update completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating service categories:', error);
    process.exit(1);
  }
}

updateServiceCategories();
