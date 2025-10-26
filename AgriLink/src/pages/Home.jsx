// pages/Home.jsx
// import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for featured farmers
  const featuredFarmers = [
    {
      id: 1,
      name: "Arulmozhi Devan",
      type: "Mushroom Farmer",
      location: "Thanjavur",
      image: "https://i.pinimg.com/1200x/31/16/66/3116663ba402d95af6c7c3e2e33f0d7c.jpg"
    },
    {
      id: 2,
      name: "Mike Chen",
      type: "Mixed Farming",
      location: "Erode",
      image: "https://i.pinimg.com/1200x/1f/ed/ac/1fedace8c84f4d3d2344fb5673783726.jpg"
    },
    {
      id: 3,
      name: "Rudvika",
      type: "Mixed Farming",
      location: "Uttar Pradesh",
      image: "https://i.pinimg.com/1200x/c1/90/26/c19026f4f369947b8d2c79d840ad59b2.jpg"
    },
    {
      id: 4,
      name: "Priyanka",
      type: "Beekeeper",
      location: "Kanyakumari",
      image: "https://i.pinimg.com/1200x/5f/97/cc/5f97cc69d5bed852da7b05606d7fbfb7.jpg"
    }
  ];

  // Dummy data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Honey",
      type: "Honey",
      price: "18.99",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 2,
      name: "Shiitake Mushrooms",
      type: "Mushrooms",
      price: "12.75",
      image: "https://ruffgreens.com/cdn/shop/files/shitake-sub_480x.jpg?v=1681916344"
    },
    {
      id: 3,
      name: "Fresh Vegetables",
      type: "Produce",
      price: "15.00",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBYYFxgXGBcXGhodFxgWGBoYGBgaHSggGCAlHRgXITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGy8lICUtLS8tLy8tLS0vLS0vLS0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQACAwEGBwj/xAA/EAABAwIEAwYEBQIEBQUAAAABAAIRAyEEEjFBBVFhEyJxgZGhBjLR8BRCUrHB4fEVI3KSBzNTYoIWQ6Kzwv/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwAEBQb/xAAsEQACAgEDAwEHBQEAAAAAAAAAAQIRAxIhMQRBURMiYXGBkbHwBRShwdEy/9oADAMBAAIRAxEAPwD7iooosYiiiixiKKKLGIooosYiiiixiKKKLGIooosYi+Z/HvH3Pc+i3/lN7rurgQSZ6ER6819A4vjhQovqn8okDmdGjzML4ljsS5zy5xkuJJ6zqtwNFWwWlU70cx+y1qBYMbDx42Rz6dlJPc6a2B4vPNR9JEsp2XQ1BjJCqrhi438llhwWGBodZ26prWYIBQ7wLmJ/t/VQljRWMgKs0vMchK2wDnBpYdJJHnqFfDMiStgFTHjp2JN2Wc+MvisMLUylzT4hXxO3RY4lve+911J1uQasf8C+J34R4Le81x77JgHlHI9V9b4LxNuIotqtBAMyDqCDBBXwGkJcXHYmPVfRv+F/EYfUoucIcA5jTzFnR5Rboi3qVkpRo+jKKKJRCKKKLGIooosYiiiixiKLFmJadCtWuCSM4y4YWmuTqiiicBFFFFjEUUUWMRRclc7QaShaMWUXJUzBa0Y6oqmoOaq6qFtSDTPH/wDFCq4UKQHymp3vJpj+fQL5hUMr6t8fva/D9mbOu5nUsBJHm3N6L5VF0upS4LQ2RiX6TsR+9kypuEwlmJZ9/staQM/N9+qirTLOhq0KrxusJda6u97uhTNhSOPEghC7evJEMdfxWL2HK6BMa6dUjHSRxjbeJK67UKlSsAJWTq1sypFiyRpiFMQyQD4Ic4g/pKtVrGBAKrqVEmtwelVkT1KbfD+N7LE0qmzHBx8NCPQlJKVgByR2HEDqUYXW4JI/QzXSJC6kXwVjxWwdI7tGR3iyw9sp804fXA3QbS5OemaqIV2LHJZPxhOlkjyxGUGGPqAalDvxvIIJziuSpPK3wOsa7hJxruQUQsriXW/I2lGFOt3o8UwwdS2q8EeKOBkGSoOPuGhXlx6hxd0dk8aa5Po3aLjcUOa8Cz4hqGwJK2ZjKrbwSqP9Qp8EF06fc9y7EKr8TZeGqcdqTMwsq3HXRcknos+vbXDF9KK7nuG4o8wqVcQToYXzoccfJBDrdV0cYfFs3qg+plVMbTDk+hU3EfmUYe9Mr59/jDpjveqvS4k4/mcPFD16DsfSDXFrqOrN5hfNq3FXEiXFdbxG93OVf3b8CenHyfQ6jgSLqznidQvngxx/U73RWFrvcQMxuQN9yl/dIbQvIs+PuIl+Jy/lp2Ht7zmXl330RHGMRnrVHDQudHhMD2QbSvYcaiRi9wfG1SN/sK1HFSLgz0WOO70AakwPNUpnKSP0kj0K4lJqdWdHYbUq5gxMW5bLXtuYPoVjQfaQr1H26K1NdxUyF1pVa7rFcrnuoeo45Sef9VqHTNa+ioattJ6i665yz7O0jqir7AddzuQEE3kFVdiAGm8Kjmjku06bHVGNeCWnNMa2aSI80ZSklYlJsXsqy63NM86TYU94JkwyPVVwytbi5Ee9/wCHOPIqVqEmCA8DqIafUEf7V7oyvjnBOJHD4ilWH5TBHNps4ei95xP4hFcNLH5BFxN1PqdMZW+4kLa2PT32uqPeRciF53gvFCCctUOHIq+N4x2jw1z2tG4BXN6mPyU0THDsa0CZSar8YYdrzTLjmHQphxbH0KbGkFptEhIHV8JVdL6Tc2pNroOW1oKXZjn/AB9nI+iiW/4nhdmwol1+7+RtC8iZ9M3DRMTK0weGLyCRYgyEfhMI4EyZl0pkGREC2y8GWfsjsWJcsywWCa0GdSVq/GUxIJFuaDxNcsJHiV57ilR2o1J0Qx43N7gnLStg7HY1mZ0R4pXXxbdZ9As3UC4Bu5iVVog5LQJm1l2RSSOGTt2XoYlpsTrutn2sdEurUw5waGwOY6LuFs6DBHMpmk+BbGBqQJtHjddp1G7uCzqU52b06IWnQcNpHM3S1aBYYxzd3CF1mIYDa6FDKbzFutlnUwrWju1ELV1bNY0bxfszH2ENxT4qc2oGUzlIAkgDUibkjaY8lngsGa5dlYHZWl0uMC0CSdhJCDxfDHmXE0y43OVuXrrqfNeh0HTXJ5NP1NLJtTYFXeLddvBSmVlVYT3DLXC4++Sxp4hwJY4Q6DfmvRlk33DGIThaWevRb+qqwergEPxR7fxFbL8vaVI8M7o9oTn4Zw4OIoF1h2mcO2ikC93/AOUhxLRndGmYx4TZcT3nZZBGDxEWROcbJYxxBRlDFDlC6YNPZisMqNQ8NyGZmLRvfdbh4IWTT3SPH791WUdhUyVQsGVIsiSZKwfR5GENLW6DaOueh2YnJWpP2D2z4SAfaVWowoTFCynkuUWmGNJ2XxtEU67mj5ZJb/pNx9PJbUX38UfjcB2rc7DLmiR/3DVw8QJI8CN0nD9+V1ukncfgCe4ya9eg4dxGi8Q+nDhuPzRuvJvfNhui8LUiNuRXVl6eHUQ0y+T8EFkeN2j1H4hmfusHqq1awn5AUnqUWnKS9wcdh9UW/DuNNoa+4JmTFivmsmFY5OMnVOtzpXUNo2djwbdkqvxZaf8AlCOaH/ChrSc0nSx3RH4GpJ78CAhKEV3+5vVlLgoa5/6a6gn5gY7QKKnorz9xfWZ9J/EtsbXWOOrmO4QLry9Ti5zFumUnVUPFtQ4m8+PkvMjglaOv10NOLYyG6bapAcW4k5RdaVMVnEE6wt2YCnlEGTv3oldcaxx3ITnbsEGZgEAlxknfb+EO3EvA3kx7JjiKWQiGyOYdp4oapiWg/L3hIg8lSGRN7JP6EZGTqrRBdubgb+ao6g2oYacn7LHFVWgEhul41HkgqvEL8t9F0JJ78f0LT7DfB4F03eABvKcUcNJAbEmxO3jK8g3FZiHHTcIxnGKkZWi0EC2xUssZt7cGryMjVpE999p2Ee6tRxNPMQHNgAwI1jmkTqTi1wOoW/DqDW1WEnNdstKeeO+NgfM9XxvFtw1GlhxJq1BnqBoveC1vlPrKSfinNuaVSPI/sV6HGYcENxDr1KoLr/lBc6APf0CoxwDSXaL0Y5pwxpQ4Lw6aEpe0IWvpYhkjUa7OaUnxTO+1jhJDh32iYBmDHloiuIhjauek4AkGY0/pquYNpe75rBgzGY577mVDL1fs+8DioOkOsXUZSoANH+YaRYDfugul0ToSC+TzIGgXlqtIwHR3SSJ2kQSPceq9DTwRztcwdowEEwbuj5rHSYjXZatx9Af8umWVZLic2a7tsugHTZcS6yUai43+dzJ7Hk6lBwgkETcTIkHcc1XK4L2DeJvcTncLD5WgQJsbHy0SzE125hn7wAgTYAkRp5K0erXEo18HZlKxRTxBCLp1M0x/PLopiKbC0OaL73kdPBY4R8OsbxNj5fsV6eGanBSTFbLduQNtuqzdWqdPMLaOYVKmio4S8mtAL8Y4GC2fD6KhfmJBEGN+YW4OUl0GQO6f0nn5K+NxnanO8y614gyOcarnlklCWl7oPI2wBhjTk1YJNt2rzrRBIO1vSyZuwtTsQ9sRmAsbj5oBG2iExuDewZnCx35HkUvSySk15EZgwxe5OgG56BG0cA513OLeQH8lD4L9XomlGpuvThvySk64NMNhzSILS57TZwIu07OA9lvla4yQY+UEyJ8QuMxDAbvaOhMJdjeIFhc5pDmmBrIuNfZcHXYIT9tPdLsGKYyAYHfOGtseaxxGKdJy1AWnuhec/DVH94AgE+S3pYJ0QXWB2+q4PSTVSG47hTqZFsx9FFtSpYoAZKLi3Y5Jkc5UTrI1sNQzx7JeS0GCYvf1QGLqusBsiWY0Gw80LTJe4hsSN9FyQqPIZXdmmBpvNza1idAjXU2DRxc86gT7KxpVoYS5nZuBlojTpzUxdanSLXMAnfwS6m2nXN18vNiy5o0xNCWgMbUnexQNdxLicrjFnWNoRLviI5gQIA1HPzVX8fL81h3thyRxxlttX9bmthDaVN1FuWkc8ul14i0Qk7mhxylpzaAH6LarxEnU6aIzDUqnzZLkd39X1VZtb0/qaxVVwAY4hwN9Bp7KVsXksBB8F6Sq+iA11XNJsZmRGqV4jD0znf2klohgi58kmLLqW9/TbwBvyY4ag+r3nd0CNZBhM2YnDZ2tFPM42nmSvN4rilT5S48oTz4UOZ9MZRm7Rt9CBmGnNNJN+1JvbsjJHsfiNw7QMGjGtaP/ABaAkOMqd0jonHH3TXfzk/uUk4ozuk9F6Daikjrgm42eNJ1JbpbWxjp96phgcSPkaBctH767pO6uXeSMwbcrg5uhBnzkfyvOmtmQaHlDHlrmy4Gc+bLIbroOcLtTECmXZTAcCTe8ut47BInVNAAIm391uw5nBzzbobmBb+FLTW4K8jmnVaAQRBIJA3IJMAk3138Fkcrsoe0OmZIkRtrvEn0CDpVu+C4Q1oIH+2b+cLofmjkScx2tdTafkKSL1Tkd3D3fzDblaOiYYrh7SJaIMaja2mbU7IWhWblc7JrpPI7+NvdO6NVr6AyOkNBBJF5jSPQeUq8NnfclNtcHnMbgiaAe0wWE5536/fJL8KDFzK9nwyn2lMs8QTFrzrztshKHwTUF+0a5u8A5o6NvJ6KuPqHVSY6lewkDNY5bLn4VrmGw8rab+ytRO5kRZw3HiPVXcAKZOoAO3LmnbG4O/DVQ5ajALxmAPSJ/ZNsf36ZZlGfL8v6gRNxsUv4BXfUrDuyQw/K2AJjWBqevJAY6rWpOIe0sceYIJ2kHdS9Jzm+y/P8AASjb25BH4c0yGZmmwIgg6/lMaEaf3RmBpOqWBhu5/gIThtJr6nemBFhab816NzG0nNaJAfmN4sZm0eJXfHqt/Tvc1LXQbgMGwCIBB1ndecfwHs6j6YaXDMYn5QNW3O8SvS4d113jlQwwTBc0x4t1HoQo55elFtL4/A6cr1Y7EowjMzHhzQ0QS06EjUeaY1sYAe0IpuaSXBg0zW/skFXFCZygOGv1ha1HCo3MHZSIEEa/1SuGrd8HDbGf+IV3XDoB0AMAdAFE+ocSwjGtYHA5WtE5QbwJuesqLnbjfH3LaF3kfPhVIT/g2BYWS75njTQATaTvNkiYzMQ3QmBO0k+y9KaMUexDw1jLk6l5tJ5mTEA2Cllaqm6NwC4rjDWd0tuLdPLokuOxlOoZHdPXmnQ4fTIIDXHSS5+W95sB/JQ9HA0qVQvIMAGNCBI+a/sjhljhemVv7/X/AEm0rsV4LhlWqwuHdAIEukTM/LziL+ITHDfDdQtzB/oD9VrxHEMIa6nVuHWE/NMTbyCz/wDUlZrs0Ni1oslyvO98ar4h1BbqbaLGyzNZxe7LcmTl10iBoifxjfmBzGO6AbabpRiuN9qSYyzYgGRoR+yEFTl6BVeFZqlk5rgVtjGhin1DFX5Sb7R4QpT4U95c0VGxtYyl7McCABzjVEMxzw05fm/Kfqm9KSTWN79vAG2EGk2hLnhtQuMaaEeKt8NVw/G0IsXVqfgO8LAIUEvbFXvGZN4BT74HwFP8bS7O8EmHXIhrjIPRXjjr2ny+eTRavcd8YE4ip/qKQfFWN7Og6Pmd3W+J38k8xrx2tRxNsx84XjeOVDUqyPlYQI9CfZUzJv5Hoqfp4m/Im4bw/IG1KocWggwP56J1hiHwWju3aS4j+m8eq0wcEFziDBsSTEG8dfFFcMote17nNaXO5ScvqYII5DdebObk3f58jz3OxZVwtIxBy6EkyZvBi95/lEYTBNJJcHFuomBtvedOi6MHkrA1Hk0ZMEWa3WGzrMibJjTrjKSc8OECe83oZnx9UdM9Nx3BqbE/F8CGNlp7oALiTJIk2ba20zvAQTnktkd1gbod9b+KcfjS2m5rhJFiAb5Zi5J3vZKGVBls0QbZem6r02Nz2Z2YHj0yeRfAK4PFQwDY+33HsjMUXMDcphmXJlE6kyXHmZSV2L7J5ZGWLQLedk0rOAwnamSWubrykJ549O6Z1whhyQcNPC2fv3+vYe4DFdjla/KGyMt7mQZc4+K5iuOF7olwDXOADXEB0c4M6jXqvPYbE9s2T82/9P2RVTCxTJ3loFxrNlPQr/Pywx/TJaddrjc4OIONTtMoA/SJM+sk2/YI3jeMzUC40Wuce4XNGRwnSI1ExbqkuFx+V5BAIzESNr8kx4hjiaIbENzAyASDManZNOTjXc6I9L084SXEvt+d/wCj03wm0U2ta1o07xMyTueiv8VcHOIovhvfZ3mxvobeI2WPAsc0NEGYTc1X951gwjvDlredxzsuZ5ZX7JwSwwrZcHzzgGD/AMtz4bm1AOtv5+iw+JMWRUoPy5e66esESV9C45w9hp9rlALbuI/MN56jmvnNegcTVDmOytZZoN9zMquJuWVSZyVolbPQYSvma1wU+KBOFzwCabmujoe6f3B8ks4ex1I5SIbMeB1j6J9Ra2o19Imz2lvqNfVes/aiXjumjwtYZsr2aOMZTqD0TF3CavZme7N77AI2nhqWHqU4yvdm0LribeAgz6qvGeO1Hvc2kwZGnKSBmnmQV5bzznJLFHb3/wCHK1sI3YGrOo/3BdW1PCBwzOqOk6ritpn5QNQ24Lw/P380OabC0ERcyqYyu+lVNN5dkPyzHMRfkrYPHtZTZDTrEC5JsLc/BbY3AOqjtKjsriO5SALnxIu7Zkgk3vbRcFTnkepez9ikgrD4wEEk+do80NjMWwtLSA4G06dbQs8XgWNYMroa23eIB69Ndkrr1ACY06n0lXwYMH/XJJt9ilbh7Ce6S3xv+11WrhjlntCXcogeq5+JuscVjAupuL4NuD0w7NDe9PL7siajXsuRb1VOE1QS4uPKPNGVsSCN4gzPurLGqsDk7oW08QC6yKo4rL4IbBYVr2uMnMCAOW9yqOYQYIM8lJxrcZ09hh+Mna1l6n4MruovqYgU3O/ynNpwQBLi0FziflaJ15kAAlePxmENJwzQRbQyNrTzGnkvZ/DGKpuw9RjXd89kSIdMNzyJiLF0xPNNG9SGhFNg2KxGIyuc4MO4a0OkXH5j81ptA8UMGN7MvBIlrHuO4c5jHOHkSQvUYY02uDTqZM9AJj90n440ZKpFmva617HLH8Bdzx3e/YM5NqhViarA2o1pALh3BoJOwtqtmYns6X+XJ0JFs202vH9QscZgGkDK4DSATeddf7JI7idRjagIiXAOB1EbSNQbXvovL/b7pS+ZFY5DXGY/MwMLZABiIF9J958vRVw7iTqTomRuNiqYvijXU2hrAHDV06jktuF42l3WuaANzAM9bp4Y1G6exdLTwE8UxrS3PTJbOo5eB8ksw2LJN1txXD5JymWG4QGDdeIlPjbW474qh7xiCGVALxkd05H0sqY7FH8M5uxy/uFyu/NSdpo02naxGqGxNSaRAubKOTdr4npdLJLFNvmmDYTE5bGxTIcQyse+ZgQPF39JQdNrMoDmmSJn+PZaUcs5Gw5p1b15nmeqZwi3bJQ67Lp0JB3C2Nc28XuZ1XpsEKQbDiMoHyjcckg4dhWO/KR1mNLaLLjDn0HBuocJaeihNTuons4cmKOH1ZPZm3C+J5Kjmg2a4geAK9L/AOpiBDYcY02814CkwOMwfL+Uwzn5WWJt1TLo1N23sfO5eoq1E9DieOVavdNQho/K2wEc+fnKwZQazLUaWkGQ7KIAO1tt+SX1KjaLImSdTuT9AluMx5ecotMZiOQtf72XROCTSWxxq5WxxjeIZqjst2ODQbbt3b7X6IqrjhSAqROliQDcke1vVeVNVznBrJnQAaorF8KrZAXEZWmSCdJtKOtqlEtjUqsd8P4W3FYlzxNNzg54IIc2bTaLaykmMxLqbnMd8zSWnxBhGuwdahTZXZV0MGLZdIknUE20SrFnOM0y4klx2kkpNORyergVxrZ8nBXAsuIA9WH3XEdPvNR7bgNBzAKmZpcZygG7B8pcTsSJAHTwTYVgxuZ7g3NqXdB67JNi+OFrgxgIpDug3E2iQdlTHYJjqBqB8nMIkzFjLT4rhy4vUScnSbWxNvcE4vjqFSYaQ79YMA+I3HXVJq2JOaYt6yoGaIpjQ3l4BdePHGK0pDNgzCwiS+D+mLnRYkWJyet/bZcxGJaXkhoH3crOnXJJy7XlPGAeC2GfAiLk/wBleviXk5RYHXSV21ifG1vdauqtLi4sE/6nCPQqil7xXRthGgTcCRBHvIO6MwlZua+oHdMTB+5QuCwBfAaMtzJdJFusStcVgWs0rS7llI9yb+i2mV6ktibaZfG02kZSZMiT99JXofhnEjMaLbB1Nwb4th49mm/VeRq1Tcu1PunHA8a1pou5VGzpPzXvtb2K0ZSdrgMdpJjPj1YySNW6eSJw2Ne9mUdmC5jHGZI/zKTKmnTPHksuNMaHPAMxISgGwgkQ2n/9FEfwr5JNcPlHVFBtThZi9Ru3MrLGfDgqfmaLC8bwBPmgs7hufUrZuKePzH1K52ymwMfgp3/Xb4ZT9V2l8FvE/wCe3zafqiPxL/1O9Sqve52pJHUn6o6gaUGUfh4hpaazHA7QfDWUE34KdJIxDY5ZT9UTSqGN/U/tKua3iPvxSJpcIbSizfhd2UtNdpka5T9fuFkPhCoIPbtj/S5WNbxPmVZtdwuHH/d/Ra14HjsqTCsN8PkAZqrXQIGtlhV+FHZy5j2CRyKlLFkky47nVcdinTZzvVClfBT1padPb4IOw3CKjNDS/wDkseN8JfXLS6pTGXx5RyQbq7z+d3kVn2jh+d3qVtEdSlQZdVkljeNvb4I0Pw3VIhlSn7/RE4b4cqMHzNLjqZPp0CEbiqg/9x3oujGVf+o5W172cTxRZXF/DGIcZz0+lzb2WLfheq22ZnW5v7LcY+r+sqHHVP1lTdMZQiYYD4dqtql7nMDcpADSZuRcymlHAOEy8EGQRNoKCOMqR8x9Fn+LrfqPp/RYoqS2HdLBxh307OmMk3BOYZZ84Q3E+EMPZ9plDtHvbDdNyJjQQtsDigaFRrwS5ozZtAd9Rod0udg3P72dzhfuk39d/Zc+ZN5E9SXYh1Lpr4FxjWU+4yC0aaeKi8piKmRxbyMKKH7JdyVsZ47FGbiRqTrMH6wgamO5W6Ih+OAsdDy6rA06VSm93e7QQQBGUAa5p6nZehOluTijmGd3cxWFXFTB2WQrS23QBcDAXBu59vEoaR0vJSjTc58CL9AUY7BuacpEc5Abr+6fswuFwl3uL6kAtEd4DmQYyzrziLXSjiOJpVXl4c4WiDoORH7+aWEpTfFL37P6Gkwbsf8AuE+a0w7Q3vZrzaBpzM+aXPeZ7rp5bK9CtA71uXRUquBUhm7FPcNZ8fquVQ4CXAxFpQRxPW6YNxGclxvN+nhz9CmxwlkvUwMXPqyqtrxbSDP7LnFKRb3mmRNxyWFBwJl0u6THvC2jyHsfSMK3taIqEj/MDXeB7zXD/c0pW3DPY52cQJaGnYgMY0Qf/FZYDGMdhKdFhLXBz9TOpDgD6lE0uIVqcNqMJG1pB6ozfsqzsgk9wfEUzsfcIeHf2hFYrHufqI8robtfuFBKxpNJlQXdfZW/3Kgf19lMzvsI6QWbh55FZPnk73XGvd9yr9uR+X3Q0hsyk9fddbWOmb2WgrkbAeq4/EaS0OC2k1mlIb5j6qzh/wBxQxqN/T+6sHc2j1d9EaNZZ+Ii1j+61Y4Ed4AFZioALZR5FZvBIm5HgR+6yQGbw37JXcreaHp0RuHeoXMoGw8yfojRrLF3hCq49QrNjk378lek0Ay7LH30StBTMqTptNlq6RoVjWrcg3p9wmWErVJA/Dgi1yASDznZFQrkKd7DPAYBz6NRk5S8QCeVhMeCIw/CXNGQmRl+YC5m3kVaiSKjXVD8t4Hyt27x38F3gPEBUqVATdwkbxB0HlHovK6/JNv2eIq/5E6hJSSZi/4boOMuF+pC4pi+PMD3ASQDEiNtduaikp9a1abOXUfOqjydYvpvCLwEteC6Q3RxbcxHJA4mtfugeQWeIe43N4jRe5pswwZUZJJaHWcBYtF7B383WFCrkLi35tidv+4deXLXkgxXdAuRbRSlWJ68/qqt7X3BVBTnEm5k7km/uqObNpHrP7KC4k+pWfbhvy681NRAizqTAdT1j+q7WDcv8E81g2m5xa0SS4gAAXMmIC2xmBE5TUZb9MuvrcgR6Ep4ryFmJiBF/ryRTHFoF9B9hcp4IsYTnN7WFjCHfRP6vZGSp0BNGtasHANg3Op2H8rNtXlborMZaC7kAT9PvRMnYVjXtcB8toG8TczvYFbZozaK03ZC0mQ/U7RyBH3qmo+KC0ZcsnYleYrBzqsExmOp8ySmFTDjLFMkWtMEk8yYsOgS6b2s0Jyg9hhV4yH3JIPQC/jzQGK4pVDhkfYi1gdLGbKlCkWkEuk3m3SNfNDVQWutodI/ZKkl3GeWTC8TxCs0DvQTM2b06LJvFau7o8h9FlU06rGo/RNFbAU5eTd/FK36/YfRUdxWt+v2b9FiVUtRKamEHitb9fs36Kg4lV/Wfb6LAhSETambHG1P1n2XTj6v6j6D6LEBcKxtTN/8QqAfOfb6KUOJVjq8x4N+iDddaEQI9UewNTHeC4hc55cI21HWN4RXFcbTim2lBJvmkidgDJsZSngdMPxDGHRxIP8AtNk441wIsYS0SGkOGsgGxAA1/Kb6ZSuTJKCyxTe/8C275NMLgCRTqGo4seQCG/MDbWbb9LlehxHCh2bu6GkNzFwk5YBgCTc2BPikPw/j2GnkLspBkjmNbTvMSpW+LXkFuQHNLdyYNtt7lceRdROdR7MKmxfiAW326HRaYbiT2nM17p2mI6SssTOQkX1kb80nqYqwheglN7MdSl2HVTiz7kvPUSYJO8abT5BZ0OKVGSWmCQRO8HWPLfqkZxXPSb9UTjHGc/gLbRYLehFKn3FoK/EH9S6lfbnmuJ/SYBnUflpltpJvrYDkVgHEODmQINpGa/gRdRRZcGNmseSXVDIbJNhcu0BIg3Kzo0soc4taSbDWBO4AOvLkuqIxVtoVt0YTM6X01te8LOw6+SiiatzI3wdVzQXtJBPcBGoBBLo5bDzKr+6iiEluCQwwuJOTKdW90eDiSVWrSBnbayiiSTYvcF/COdZtzoBpPqi6RdAa75gTP35KKJHN00F8FqzRaRJ5n9lQ1yNf7eCiibU+wDJ7iT3ZJg28PTkgquIJPgooqRihqJh6hcTy+uilQrqio1SA+SlN+y0UUStDHIUUUShIqOUUWRjlJu642pN1FExjTD4k06jH/pc0+hXusXxZrmOA2BFwSLaCOshRRcfVYoy0yYGeQx+FA71PQAZpsZ3PJL+00IUUXTi3W4yPSYeocom5geI8/RJuKtDXZhYO1HXn5rqiKbbQVyBtw4f8tj5oqk4/K8X36qKJp8GYYwgCAG+gUUUSXLyA/9k="
    },
    {
      id: 4,
      name: "Bee Pollen",
      type: "Honey Product",
      price: "22.00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4XF3ne9Q93kmO1TOAPdSkJY_UEPIGzGpzGA&s"
    }
  ];

  // How it works steps
  const steps = [
    {
      id: 1,
      icon: "🔍",
      title: "Browse Farmers & Products",
      description: "Explore our directory of farmers and their products"
    },
    {
      id: 2,
      icon: "🌱",
      title: "Check Land Availability",
      description: "Find available lands for farming opportunities"
    },
    {
      id: 3,
      icon: "💬",
      title: "Contact Farmers or Sellers",
      description: "Connect directly with farmers and landowners"
    },
    {
      id: 4,
      icon: "🤝",
      title: "Make Connections",
      description: "Build partnerships and grow your business"
    }
  ];





  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Farmers and Landowners Easily
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find farmers, land, and agricultural products all in one place
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/farmers"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Farmers
            </Link>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View Products
            </Link>
            <Link
              to="/landowners"
              className="bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Find Lands
            </Link>
          </div>


        </div>
      </section>



      {/* Featured Farmers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Farmers</h2>
            <p className="text-xl text-gray-600">Meet our dedicated farming community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredFarmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={farmer.image} alt={farmer.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{farmer.name}</h3>
                  <p className="text-green-600 font-semibold mb-1">{farmer.type}</p>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 inline-block"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                      </svg>
                    </span>
                    {farmer.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Fresh from our farms to you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-md font-bold text-green-600">₹{product.price} /Kg</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;