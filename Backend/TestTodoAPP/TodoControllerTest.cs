using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Controllers;
using TodoApp.Data; 
using TodoApp.Models;

namespace TestTodoAPP
{
    public class TodoControllerTest
    {
        private AppDbContext GetInDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                              .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
                              .Options;

            var context = new AppDbContext(options);
            return context;
        }

        [Fact]
        public async Task AddTask_ReturnValidCreateTask()
        {

            var context = GetInDbContext();
            var controller = new TodoController(context);

            var newItem = new TodoItem
            {
                Title = "Test Create",
                Description = "Test Create Description",
                IsCompleted = false
            };

            var result = await controller.AddTask(newItem);

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetToDoList_ReturnValidGetAllItem()
        {
            var context = GetInDbContext();
            context.TodoItems.Add(new TodoItem { Title = "Test1", Description = "description1" });
            await context.SaveChangesAsync();

            var controller = new TodoController(context);

            var result = await controller.GetAllItems();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);  // returned 200 OK
            var todos = Assert.IsType<List<TodoItem>>(okResult.Value);
            Assert.Single(todos);
        }

        [Fact]
        public async Task GetToDoList_ReturnValidGetItemById()
        {
            var context = GetInDbContext();
            context.TodoItems.Add(new TodoItem { Id = 5, Title = "Test5", Description = "description5", IsCompleted = false });
            await context.SaveChangesAsync();

            var controller = new TodoController(context);

            var result = await controller.GetItemById(5);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var item = Assert.IsType<TodoItem>(okResult.Value);
        }

        [Fact]
        public async Task UpdateItem_ReturnValidUpdateItem()
        {
            var context = GetInDbContext();
            context.TodoItems.Add(new TodoItem { Id = 5, Title = "Test5", Description = "description5", IsCompleted = false });
            await context.SaveChangesAsync();

            var controller = new TodoController(context);

            var updatedItem = new TodoItem
            {
                Id = 5,
                Title = "Test1",
                Description = "description1",
                IsCompleted = true
            };

            var result = await controller.UpdateItem(5, updatedItem);

             Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task DeleteItem_ReturnValidDeleteItem()
        {
            var context = GetInDbContext();
            context.TodoItems.Add(new TodoItem { Id = 10, Title = "Test10", Description = "description10", IsCompleted = true });
            await context.SaveChangesAsync();

            var controller = new TodoController(context);

            var result = await controller.DeleteItem(10);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsType<List<TodoItem>>(okResult.Value);
            Assert.Empty(items);
        }

        [Fact]
        public async Task DeleteItem_ReturnNotFoundID()
        {
            var context = GetInDbContext();
            context.TodoItems.Add(new TodoItem { Id = 25, Title = "Test25", Description = "description25", IsCompleted = false });
            await context.SaveChangesAsync();

            var controller = new TodoController(context);

            var result = await controller.DeleteItem(10000);

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}